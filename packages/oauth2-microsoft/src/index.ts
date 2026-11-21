import { OAuth2Client } from '@aomex/oauth2-client';
import {
  mergeOidcPreset,
  type OidcVendorOptionsWithOnProfile,
  type OidcVendorOptionsWithoutOnProfile,
} from '@aomex-contrib/oauth2-preset';

/**
 * Microsoft / Entra ID OIDC `id_token` 扩展声明（在标准 claims 之上）
 * @see https://learn.microsoft.com/entra/identity-platform/id-token-claims-reference
 */
export type MicrosoftIdTokenClaims = OAuth2Client.IdTokenClaims & {
  /**
   * 目录中的对象 ID（Object ID）；同一用户跨应用稳定，常作业务主键
   */
  readonly oid?: string;
  /** 租户 ID（Tenant ID） */
  readonly tid?: string;
  /** 主用户名（可能是邮箱、电话或 UPN 等，取决于租户配置） */
  readonly preferred_username?: string;
  /** 用户主体名称（User Principal Name） */
  readonly upn?: string;
  /** 令牌版本（如 `"2.0"`） */
  readonly ver?: string;
};

export const microsoft = {
  oidc: { issuer: 'https://login.microsoftonline.com/common/v2.0' },
  scopes: ['openid', 'profile', 'email', 'offline_access'],
} as const;

/**
 * Microsoft / Entra ID OIDC 客户端；省略 `onProfile` 时 `callback` 返回已验签 claims
 */
export class MicrosoftOAuth2Client<
  Profile = MicrosoftIdTokenClaims,
  Claims extends MicrosoftIdTokenClaims = MicrosoftIdTokenClaims,
> extends OAuth2Client<Profile, Claims> {
  /** OIDC 且省略 `onProfile`：`callback` 返回已验签 claims */
  constructor(opts: OidcVendorOptionsWithoutOnProfile);
  constructor(opts: OidcVendorOptionsWithOnProfile<Profile, Claims>);
  constructor(
    opts:
      OidcVendorOptionsWithoutOnProfile | OidcVendorOptionsWithOnProfile<Profile, Claims>,
  ) {
    super(mergeOidcPreset(microsoft, opts) as OAuth2Client.OidcWithoutOnProfileOptions);
  }
}

export type {
  OidcVendorOptions,
  OidcVendorOptionsWithOnProfile,
  OidcVendorOptionsWithoutOnProfile,
} from '@aomex-contrib/oauth2-preset';
