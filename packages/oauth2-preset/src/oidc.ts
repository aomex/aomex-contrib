import type { OAuth2Client } from '@aomex/oauth2-client';

type OidcVendorOverrides = {
  oidc?: Partial<OAuth2Client.OidcConfig>;
  scopes?: readonly string[];
  authorizationParams?: Readonly<Record<string, string>>;
  revocationEndpoint?: string;
  tokenAuth?: 'body' | 'basic';
};

export type OidcVendorOptionsWithOnProfile<
  Profile,
  Claims extends OAuth2Client.IdTokenClaims = OAuth2Client.IdTokenClaims,
> = Omit<
  OAuth2Client.OidcWithOnProfileOptions<Profile, Claims>,
  'oidc' | 'scopes' | 'authorizationParams' | 'revocationEndpoint' | 'tokenAuth'
> &
  OidcVendorOverrides;

/** 省略 `onProfile`：主库 `callback` 返回已验签 claims */
export type OidcVendorOptionsWithoutOnProfile = Omit<
  OAuth2Client.OidcWithoutOnProfileOptions,
  'oidc' | 'scopes' | 'authorizationParams' | 'revocationEndpoint' | 'tokenAuth'
> &
  OidcVendorOverrides;

export type OidcVendorOptions<
  Profile = OAuth2Client.IdTokenClaims,
  Claims extends OAuth2Client.IdTokenClaims = OAuth2Client.IdTokenClaims,
> = OidcVendorOptionsWithOnProfile<Profile, Claims> | OidcVendorOptionsWithoutOnProfile;

export type OidcPreset = {
  oidc: { issuer: string };
  scopes?: readonly string[];
  authorizationParams?: Readonly<Record<string, string>>;
  revocationEndpoint?: string;
  tokenAuth?: 'body' | 'basic';
};

/**
 * 将 OIDC 厂商预设与用户选项合并。
 * `onProfile` 原样透传；省略时由 `@aomex/oauth2-client` 返回已验签 claims。
 */
export function mergeOidcPreset<Profile, Claims extends OAuth2Client.IdTokenClaims>(
  preset: OidcPreset,
  opts: OidcVendorOptions<Profile, Claims>,
): OAuth2Client.OidcEnabledOptions<Profile, Claims> {
  return {
    ...opts,
    oidc: {
      ...preset.oidc,
      ...opts.oidc,
      issuer: opts.oidc?.issuer ?? preset.oidc.issuer,
    },
    scopes: opts.scopes ?? [...(preset.scopes ?? [])],
    authorizationParams:
      preset.authorizationParams || opts.authorizationParams
        ? { ...preset.authorizationParams, ...opts.authorizationParams }
        : undefined,
    revocationEndpoint: opts.revocationEndpoint ?? preset.revocationEndpoint,
    tokenAuth: opts.tokenAuth ?? preset.tokenAuth,
  } as OAuth2Client.OidcEnabledOptions<Profile, Claims>;
}
