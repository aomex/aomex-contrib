import type { OAuth2Client } from '@aomex/oauth2-client';

/** 默认 `callback` profile：换票令牌 + 用户资料 */
export type OAuth2Profile<User> = {
  /** 授权码换票得到的令牌集（`access_token` 等） */
  base: OAuth2Client.TokenSet;
  /** 厂商用户资料接口返回值 */
  userinfo: User;
};

/** 厂商包 `onProfile`：框架已拉好 `userinfo` */
export type OAuth2VendorOnProfileArgs<User> = {
  /** 换票令牌 */
  token: OAuth2Client.TokenSet;
  /** 已拉取的用户资料 */
  userinfo: User;
  ctx: OAuth2Client.OAuth2OnProfileArgs['ctx'];
};

export type OAuth2VendorOptions<Profile, User = unknown> = Omit<
  OAuth2Client.OAuth2OnlyOptions<Profile>,
  | 'authorizationEndpoint'
  | 'tokenEndpoint'
  | 'scopes'
  | 'authorizationParams'
  | 'revocationEndpoint'
  | 'tokenAuth'
  | 'onProfile'
> & {
  authorizationEndpoint?: string;
  tokenEndpoint?: string;
  scopes?: readonly string[];
  authorizationParams?: Readonly<Record<string, string>>;
  revocationEndpoint?: string;
  tokenAuth?: 'body' | 'basic';
  onProfile?: (args: OAuth2VendorOnProfileArgs<User>) => Profile | Promise<Profile>;
};

export type OAuth2Preset = {
  authorizationEndpoint: string;
  tokenEndpoint: string;
  scopes?: readonly string[];
  authorizationParams?: Readonly<Record<string, string>>;
  revocationEndpoint?: string;
  tokenAuth?: 'body' | 'basic';
};

/**
 * 合并厂商端点预设；缺省 `onProfile` 时先 `fetchUser`，再返回 `{ base, userinfo }`。
 * 自定义 `onProfile` 时也会先拉 `userinfo` 再交给回调。
 */
export function mergeOAuth2Preset<Profile, User>(
  preset: OAuth2Preset,
  opts: OAuth2VendorOptions<Profile, User>,
  fetchUser: (accessToken: string) => Promise<User>,
): OAuth2Client.OAuth2OnlyOptions<Profile> {
  return {
    ...opts,
    authorizationEndpoint: opts.authorizationEndpoint ?? preset.authorizationEndpoint,
    tokenEndpoint: opts.tokenEndpoint ?? preset.tokenEndpoint,
    scopes: opts.scopes ?? [...(preset.scopes ?? [])],
    authorizationParams:
      preset.authorizationParams || opts.authorizationParams
        ? { ...preset.authorizationParams, ...opts.authorizationParams }
        : undefined,
    revocationEndpoint: opts.revocationEndpoint ?? preset.revocationEndpoint,
    tokenAuth: opts.tokenAuth ?? preset.tokenAuth,
    onProfile: async ({ token, ctx }) => {
      const userinfo = await fetchUser(token.access_token);
      if (opts.onProfile) {
        return opts.onProfile({ token, userinfo, ctx });
      }
      return { base: token, userinfo } as Profile;
    },
  };
}
