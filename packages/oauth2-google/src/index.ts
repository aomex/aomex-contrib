import { OAuth2Client } from '@aomex/oauth2-client';
import {
  mergeOidcPreset,
  type OidcVendorOptionsWithOnProfile,
  type OidcVendorOptionsWithoutOnProfile,
} from '@aomex-contrib/oauth2-preset';

/**
 * Google OIDC `id_token` 扩展声明（在标准 claims 之上）
 * @see https://developers.google.com/identity/openid-connect/openid-connect#an-id-tokens-payload
 */
export type GoogleIdTokenClaims = OAuth2Client.IdTokenClaims & {
  /**
   * 用户所属托管域名（Google Workspace）；个人 Gmail 账户通常无此字段
   */
  readonly hd?: string;
  /**
   * Access Token 绑定哈希；存在时会与本次 `access_token` 校验
   * @see https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowTokenValidation
   */
  readonly at_hash?: string;
  /** 名（given name） */
  readonly given_name?: string;
  /** 姓（family name） */
  readonly family_name?: string;
  /** 语言区域，如 `en`、`zh-CN` */
  readonly locale?: string;
};

const google = {
  oidc: { issuer: 'https://accounts.google.com' },
  scopes: ['openid', 'email', 'profile'],
} as const;

/**
 * Google OIDC 客户端；省略 `onProfile` 时 `callback` 返回已验签 claims
 */
export class GoogleOAuth2Client<
  Profile = GoogleIdTokenClaims,
  Claims extends GoogleIdTokenClaims = GoogleIdTokenClaims,
> extends OAuth2Client<Profile, Claims> {
  /** OIDC 且省略 `onProfile`：`callback` 返回已验签 claims */
  constructor(opts: OidcVendorOptionsWithoutOnProfile);
  constructor(opts: OidcVendorOptionsWithOnProfile<Profile, Claims>);
  constructor(
    opts:
      OidcVendorOptionsWithoutOnProfile | OidcVendorOptionsWithOnProfile<Profile, Claims>,
  ) {
    super(mergeOidcPreset(google, opts) as OAuth2Client.OidcWithoutOnProfileOptions);
  }
}

export type {
  OidcVendorOptions,
  OidcVendorOptionsWithOnProfile,
  OidcVendorOptionsWithoutOnProfile,
} from '@aomex-contrib/oauth2-preset';
