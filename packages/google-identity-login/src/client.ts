import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from 'jose';
import { i18n } from './i18n';
import type {
  GoogleAuthCodeTokenSet,
  GoogleIdentityClaims,
  GoogleIdentityLoginOptions,
  GoogleUserInfo,
} from './types';

const DEFAULT_JWKS_URI = 'https://www.googleapis.com/oauth2/v3/certs';
const USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_ISSUERS = ['https://accounts.google.com', 'accounts.google.com'] as const;
const DEFAULT_AUTH_CODE_REDIRECT_URI = 'postmessage';

/**
 * Google Identity Services（GIS）登录后端。
 *
 * **不是**整页 redirect 的 OAuth2 客户端。对接任意前端的 GIS 载荷：
 * - Sign In With Google / One Tap → `credential` → `verifyCredential`
 * - `google.accounts.oauth2.initTokenClient` → `access_token` → `fetchUserInfo`
 * - `google.accounts.oauth2.initCodeClient` → `code` → `exchangeAuthCode`
 *
 * 经典 redirect 授权码请用 `@aomex-contrib/oauth2-google`。
 *
 * @see https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
 */
export class GoogleIdentityLoginClient {
  protected readonly clientId: string;
  protected readonly clientSecret: string | undefined;
  protected readonly audiences: string[];
  protected readonly hd: string[] | undefined;
  protected readonly authCodeRedirectUri: string;
  protected readonly jwks: JWTVerifyGetKey;

  constructor(opts: GoogleIdentityLoginOptions) {
    if (!opts.clientId) {
      throw new Error(i18n.t('client_id_empty'));
    }
    this.clientId = opts.clientId;
    this.clientSecret = opts.clientSecret;
    this.audiences = [
      opts.clientId,
      ...(opts.audiences ?? []).filter((id) => id && id !== opts.clientId),
    ];
    this.hd = opts.hd == null ? undefined : Array.isArray(opts.hd) ? opts.hd : [opts.hd];
    this.authCodeRedirectUri = opts.authCodeRedirectUri ?? DEFAULT_AUTH_CODE_REDIRECT_URI;
    this.jwks =
      opts.jwks ?? createRemoteJWKSet(new URL(opts.jwksUri ?? DEFAULT_JWKS_URI));
  }

  /**
   * 验签 GIS 返回的 `credential`（即 Google `id_token` JWT）
   * @see https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
   */
  async verifyCredential(credential: string): Promise<GoogleIdentityClaims> {
    if (!credential) {
      throw new Error(i18n.t('credential_empty'));
    }

    let claims: GoogleIdentityClaims;
    try {
      const { payload } = await jwtVerify(credential, this.jwks, {
        issuer: [...GOOGLE_ISSUERS],
        audience: this.audiences,
      });
      if (typeof payload.sub !== 'string' || !payload.sub) {
        throw new Error('missing sub');
      }
      if (typeof payload.iss !== 'string' || !payload.iss) {
        throw new Error('missing iss');
      }
      if (payload.aud == null) {
        throw new Error('missing aud');
      }
      if (typeof payload.iat !== 'number' || typeof payload.exp !== 'number') {
        throw new Error('missing iat/exp');
      }
      claims = payload as GoogleIdentityClaims;
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      throw new Error(i18n.t('credential_verify_failed', { reason }));
    }

    if (this.hd) {
      const actual = typeof claims.hd === 'string' ? claims.hd : '';
      if (!actual || !this.hd.includes(actual)) {
        throw new Error(
          i18n.t('hd_mismatch', {
            expected: this.hd.join(', '),
            actual: actual || '(none)',
          }),
        );
      }
    }

    return claims;
  }

  /**
   * 用 GIS implicit / token 流程拿到的 `access_token` 拉用户资料
   * @see https://developers.google.com/identity/openid-connect/openid-connect#obtainuserinfo
   */
  async fetchUserInfo(accessToken: string): Promise<GoogleUserInfo> {
    if (!accessToken) {
      throw new Error(i18n.t('access_token_empty'));
    }

    const res = await fetch(USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) {
      throw new Error(i18n.t('userinfo_failed', { status: String(res.status) }));
    }
    const json = (await res.json()) as Record<string, unknown>;
    if (typeof json['sub'] !== 'string' || !json['sub']) {
      throw new Error(i18n.t('userinfo_failed', { status: 'missing sub' }));
    }
    return json as GoogleUserInfo;
  }

  /**
   * 兑换 GIS `initCodeClient` / auth-code 流程返回的 `code`
   *（默认 `redirect_uri=postmessage`）
   * @see https://developers.google.com/identity/oauth2/web/guides/use-code-model
   */
  async exchangeAuthCode(code: string): Promise<GoogleAuthCodeTokenSet> {
    if (!code) {
      throw new Error(i18n.t('auth_code_empty'));
    }
    this.requireClientSecret();

    return this.requestToken(
      new URLSearchParams({
        code,
        client_id: this.clientId,
        client_secret: this.clientSecret!,
        redirect_uri: this.authCodeRedirectUri,
        grant_type: 'authorization_code',
      }),
    );
  }

  /**
   * 用 `exchangeAuthCode` 拿到的 `refresh_token` 刷新访问令牌
   * @see https://developers.google.com/identity/protocols/oauth2/openid-connect#refresh-tokens
   */
  async refreshAccessToken(refreshToken: string): Promise<GoogleAuthCodeTokenSet> {
    if (!refreshToken) {
      throw new Error(i18n.t('refresh_token_empty'));
    }
    this.requireClientSecret();

    return this.requestToken(
      new URLSearchParams({
        refresh_token: refreshToken,
        client_id: this.clientId,
        client_secret: this.clientSecret!,
        grant_type: 'refresh_token',
      }),
    );
  }

  /**
   * `exchangeAuthCode` 后若带 `id_token`，可再验签得到 claims
   */
  async exchangeAuthCodeAndVerify(
    code: string,
  ): Promise<{ token: GoogleAuthCodeTokenSet; claims: GoogleIdentityClaims | null }> {
    const token = await this.exchangeAuthCode(code);
    if (!token.id_token) {
      return { token, claims: null };
    }
    const claims = await this.verifyCredential(token.id_token);
    return { token, claims };
  }

  protected requireClientSecret(): void {
    if (!this.clientSecret) {
      throw new Error(i18n.t('client_secret_empty'));
    }
  }

  protected async requestToken(body: URLSearchParams): Promise<GoogleAuthCodeTokenSet> {
    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    let json: Record<string, unknown>;
    try {
      json = (await res.json()) as Record<string, unknown>;
    } catch {
      throw new Error(
        i18n.t('exchange_failed', {
          status: String(res.status),
          detail: 'invalid json',
        }),
      );
    }

    if (!res.ok || typeof json['access_token'] !== 'string') {
      const detail =
        typeof json['error'] === 'string'
          ? `${json['error']} ${typeof json['error_description'] === 'string' ? json['error_description'] : ''}`
          : 'missing access_token';
      throw new Error(
        i18n.t('exchange_failed', {
          status: String(res.status),
          detail: detail.trim(),
        }),
      );
    }

    return {
      access_token: json['access_token'],
      token_type: typeof json['token_type'] === 'string' ? json['token_type'] : 'Bearer',
      expires_in: typeof json['expires_in'] === 'number' ? json['expires_in'] : undefined,
      refresh_token:
        typeof json['refresh_token'] === 'string' ? json['refresh_token'] : undefined,
      scope: typeof json['scope'] === 'string' ? json['scope'] : undefined,
      id_token: typeof json['id_token'] === 'string' ? json['id_token'] : undefined,
    };
  }
}
