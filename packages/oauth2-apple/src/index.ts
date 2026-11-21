import { OAuth2Client } from '@aomex/oauth2-client';
import type { WebContext } from '@aomex/web';
import { importPKCS8, SignJWT } from 'jose';
import { i18n } from './i18n';

/** Apple 部分声明可能是布尔或 `"true"` / `"false"` 字符串 */
export type AppleBooleanClaim = boolean | 'true' | 'false';

/** PEM，或 `importPKCS8` / `generateKeyPair` 得到的私钥 */
export type ApplePrivateKey = string | Awaited<ReturnType<typeof importPKCS8>>;

/**
 * Apple `id_token` 扩展声明（在标准 claims 之上；`email` / `email_verified` 等见基类）
 * @see https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api/authenticating_users_with_sign_in_with_apple
 */
export type AppleIdTokenClaims = OAuth2Client.IdTokenClaims & {
  /**
   * 是否为 Hide My Email 私密中继邮箱。
   * Apple 可能返回布尔或 `"true"` / `"false"` 字符串
   */
  readonly is_private_email?: AppleBooleanClaim;
};

/**
 * form_post 里 `user` JSON 的 name（**仅首次授权可能出现**）
 * @see https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api/authenticating_users_with_sign_in_with_apple
 */
export type AppleUserName = {
  /** 名 */
  firstName?: string;
  /** 姓 */
  lastName?: string;
};

/**
 * form_post 里的 `user` 字段解析结果（**仅首次授权可能非 null**，之后需自行落库）
 */
export type AppleFormUser = {
  /** 邮箱（可能与 id_token 中一致；也可能仅首次出现） */
  email?: string;
  /** 姓名；仅首次授权可能有 */
  name?: AppleUserName;
};

/**
 * 默认 `callback` profile：
 * - `claims`：已验签的 `id_token`
 * - `user`：form_post 里的姓名等（**仅首次授权可能有**，之后为 `null`，需自行落库）
 */
export type AppleProfile = {
  /** 已验签的 `id_token` 声明（含 `sub` / `email` 等） */
  claims: AppleIdTokenClaims;
  /** form_post 解析的用户信息；非首次授权一般为 `null` */
  user: AppleFormUser | null;
};

const APPLE_AUDIENCE = 'https://appleid.apple.com';

export const apple = {
  oidc: { issuer: 'https://appleid.apple.com' },
  scopes: ['openid', 'email', 'name'],
  authorizationParams: { response_mode: 'form_post' },
  revocationEndpoint: 'https://appleid.apple.com/auth/revoke',
} as const;

export type AppleOnProfileArgs<Claims extends AppleIdTokenClaims = AppleIdTokenClaims> = {
  /** 换票令牌 */
  token: OAuth2Client.TokenSet;
  /** 已验签的 OIDC claims */
  oidc: { claims: Claims };
  /** 本次 form_post 解析的 `user`；非首次多为 `null` */
  user: AppleFormUser | null;
  ctx: WebContext;
};

export type AppleOAuth2ClientOptions<
  Profile = AppleProfile,
  Claims extends AppleIdTokenClaims = AppleIdTokenClaims,
> = Omit<
  OAuth2Client.OidcEnabledOptions<Profile, Claims>,
  | 'oidc'
  | 'scopes'
  | 'authorizationParams'
  | 'revocationEndpoint'
  | 'tokenAuth'
  | 'clientSecret'
  | 'onProfile'
> & {
  /** Apple Developer Team ID */
  teamId: string;
  /** Sign in with Apple 密钥 ID */
  keyId: string;
  /** `.p8` 私钥 PEM，或已导入的密钥 */
  privateKey: ApplePrivateKey;
  /**
   * client_secret JWT 有效期（秒）。默认 `15777000`（约 6 个月，Apple 上限）
   */
  clientSecretExpiresIn?: number;
  oidc?: Partial<OAuth2Client.OidcConfig>;
  scopes?: readonly string[];
  authorizationParams?: Readonly<Record<string, string>>;
  revocationEndpoint?: string;
  tokenAuth?: 'body' | 'basic';
  /**
   * 省略时返回 `{ claims, user }`。
   * `user` 仅首次授权 form_post 可能非 null。
   */
  onProfile?: (args: AppleOnProfileArgs<Claims>) => Profile | Promise<Profile>;
};

type SecretContext = {
  teamId: string;
  keyId: string;
  privateKey: ApplePrivateKey;
  clientSecretExpiresIn: number;
  clientId: string;
};

/**
 * Sign in with Apple：
 * - 默认 `response_mode=form_post`，{@link readCallbackInput} 优先读 body，并解析一次性 `user`
 * - 用 Team ID / Key ID / `.p8` 动态签发 JWT 作为 `client_secret`
 * @see https://developer.apple.com/documentation/accountorganizationaldatasharing/creating-a-client-secret
 */
export class AppleOAuth2Client<
  Profile = AppleProfile,
  Claims extends AppleIdTokenClaims = AppleIdTokenClaims,
> extends OAuth2Client<Profile, Claims> {
  constructor(opts: AppleOAuth2ClientOptions<Profile, Claims>) {
    const {
      teamId,
      keyId,
      privateKey,
      clientSecretExpiresIn = 15_777_000,
      oidc,
      scopes,
      authorizationParams,
      revocationEndpoint,
      tokenAuth,
      onProfile,
      ...rest
    } = opts;

    if (!teamId) {
      throw new Error(i18n.t('team_id_empty'));
    }
    if (!keyId) {
      throw new Error(i18n.t('key_id_empty'));
    }
    if (!privateKey) {
      throw new Error(i18n.t('private_key_empty'));
    }

    const secretCtx: SecretContext = {
      teamId,
      keyId,
      privateKey,
      clientSecretExpiresIn,
      clientId: rest.clientId,
    };

    // 闭包引用：super 完成前不能用 this
    const formUserRef: { current: AppleFormUser | null } = { current: null };

    super({
      ...rest,
      oidc: {
        ...apple.oidc,
        ...oidc,
        issuer: oidc?.issuer ?? apple.oidc.issuer,
      },
      scopes: scopes ?? [...apple.scopes],
      authorizationParams: {
        ...apple.authorizationParams,
        ...authorizationParams,
      },
      revocationEndpoint: revocationEndpoint ?? apple.revocationEndpoint,
      tokenAuth: tokenAuth ?? 'body',
      clientSecret: () => signAppleClientSecret(secretCtx),
      onProfile: async ({ token, oidc: oidcArgs, ctx }) => {
        const user = formUserRef.current;
        formUserRef.current = null;
        if (onProfile) {
          return onProfile({
            token,
            oidc: oidcArgs as { claims: Claims },
            user,
            ctx,
          });
        }
        return {
          claims: oidcArgs.claims,
          user,
        } as Profile;
      },
    } as OAuth2Client.OidcWithOnProfileOptions<Profile, Claims>);

    this.formUserRef = formUserRef;
  }

  private formUserRef!: { current: AppleFormUser | null };

  /**
   * Apple `form_post`：优先从 body 读 code/state/error，并解析一次性 `user`
   */
  protected override readCallbackInput(ctx: WebContext): {
    code?: string;
    state?: string;
    error?: string;
  } {
    const body = ctx.request.body;
    const fromBody =
      body !== null && typeof body === 'object' && !Array.isArray(body)
        ? (body as Record<string, unknown>)
        : {};
    const pick = (key: string): string | undefined => {
      const b = fromBody[key];
      if (typeof b === 'string' && b) return b;
      const q = ctx.request.query[key];
      return typeof q === 'string' && q ? q : undefined;
    };

    this.formUserRef.current = parseAppleFormUser(fromBody['user']);

    return {
      code: pick('code'),
      state: pick('state'),
      error: pick('error'),
    };
  }
}

function parseAppleFormUser(raw: unknown): AppleFormUser | null {
  if (raw == null || raw === '') return null;
  let value: unknown = raw;
  if (typeof raw === 'string') {
    try {
      value = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  const obj = value as Record<string, unknown>;
  const result: AppleFormUser = {};
  if (typeof obj['email'] === 'string') {
    result.email = obj['email'];
  }
  const name = obj['name'];
  if (name !== null && typeof name === 'object' && !Array.isArray(name)) {
    const n = name as Record<string, unknown>;
    result.name = {
      firstName: typeof n['firstName'] === 'string' ? n['firstName'] : undefined,
      lastName: typeof n['lastName'] === 'string' ? n['lastName'] : undefined,
    };
  }
  return result.email || result.name ? result : null;
}

async function signAppleClientSecret(ctx: SecretContext): Promise<string> {
  const key =
    typeof ctx.privateKey === 'string'
      ? await importPKCS8(ctx.privateKey, 'ES256')
      : ctx.privateKey;
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({})
    .setProtectedHeader({ alg: 'ES256', kid: ctx.keyId })
    .setIssuer(ctx.teamId)
    .setIssuedAt(now)
    .setExpirationTime(now + ctx.clientSecretExpiresIn)
    .setAudience(APPLE_AUDIENCE)
    .setSubject(ctx.clientId)
    .sign(key);
}
