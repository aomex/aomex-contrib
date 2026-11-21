import type { CacheAdapter } from '@aomex/cache';
import type { DurationInput } from '@aomex/common';
import { OAuth2Client } from '@aomex/oauth2-client';
import type { WebContext } from '@aomex/web';
import { i18n } from './i18n';
import type { WechatOnProfileArgs, WechatProfile, WechatTokenSet } from './types';
import {
  exchangeWechatCode,
  fetchWechatUserInfo,
  refreshWechatToken,
  wechatScopeAllowsUserinfo,
} from './wechat-api';

export type WechatOAuthBaseOptions<Profile = WechatProfile> = {
  appId: string;
  appSecret: string;
  redirectUri: string | ((ctx: WebContext) => string);
  store: CacheAdapter;
  stateTtl?: DurationInput;
  scopes: readonly string[];
  authorizationParams?: Record<string, string>;
  authorizationEndpoint: string;
  onProfile?: (args: WechatOnProfileArgs) => Profile | Promise<Profile>;
};

/** 微信授权链接必填参数；顺序须与官方示例一致（公众号会正则强匹配） */
const WECHAT_AUTH_PARAM_ORDER = [
  'appid',
  'redirect_uri',
  'response_type',
  'scope',
  'state',
] as const;

/**
 * 微信网页/扫码 OAuth 基类：
 * - 授权 URL：`appid → redirect_uri → response_type → scope → state`，再附加其余参数，末尾 `#wechat_redirect`
 * - 换票 / 刷新为 GET + `appid`/`secret`（无 PKCE）
 * - 令牌含 `openid` / 可选 `unionid` / `is_snapshotuser`
 * - 不支持 RFC 7009 revoke
 */
export abstract class WechatOAuth2Client<
  Profile = WechatProfile,
> extends OAuth2Client<Profile> {
  protected readonly appId: string;

  protected constructor(opts: WechatOAuthBaseOptions<Profile>) {
    if (!opts.appId) {
      throw new Error(i18n.t('app_id_empty'));
    }
    if (!opts.appSecret) {
      throw new Error(i18n.t('app_secret_empty'));
    }

    const onProfile = opts.onProfile;
    // 换票响应可能省略 scope：用构造时的 scopes 回退
    const configuredScope = opts.scopes.join(',');

    super({
      authorizationEndpoint: opts.authorizationEndpoint,
      tokenEndpoint: 'https://api.weixin.qq.com/sns/oauth2/access_token',
      clientId: opts.appId,
      clientSecret: opts.appSecret,
      redirectUri: opts.redirectUri,
      store: opts.store,
      stateTtl: opts.stateTtl,
      scopes: opts.scopes,
      authorizationParams: opts.authorizationParams,
      pkce: false,
      onProfile: async ({ token, ctx }) => {
        const wechatToken = token as WechatTokenSet;
        const scope = wechatToken.scope ?? configuredScope;
        const userinfo = wechatScopeAllowsUserinfo(scope)
          ? await fetchWechatUserInfo({
              accessToken: wechatToken.access_token,
              openid: wechatToken.openid,
            })
          : null;
        if (onProfile) {
          return onProfile({ token: wechatToken, userinfo, ctx });
        }
        return { base: wechatToken, userinfo } as Profile;
      },
    });

    this.appId = opts.appId;
  }

  override async getAuthorizationUrl(ctx: WebContext): Promise<string> {
    const { authorizationEndpoint } = await this.resolveEndpoints();
    const state = this.randomToken();
    await this.caching.set(this.stateKey(state), { verifier: '' }, this.stateTtlMs);

    const redirectUri = this.resolveRedirectUri(ctx);
    const url = new URL(authorizationEndpoint);
    const reserved = new Set<string>(WECHAT_AUTH_PARAM_ORDER);

    // 官方要求顺序：appid、redirect_uri、response_type、scope、state，再可选参数（如 forcePopup、lang）
    url.searchParams.set('appid', this.appId);
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('response_type', 'code');

    const scopes = this.resolveScopes();
    if (scopes?.length) {
      // 微信文档：多个 scope 用英文逗号分隔
      url.searchParams.set('scope', scopes.join(','));
    }

    url.searchParams.set('state', state);

    for (const [key, value] of Object.entries(this.opts.authorizationParams ?? {})) {
      if (!reserved.has(key)) {
        url.searchParams.set(key, value);
      }
    }

    return `${url.toString()}#wechat_redirect`;
  }

  protected override async exchangeCode(
    code: string,
    _verifier: string,
    _ctx: WebContext,
  ): Promise<WechatTokenSet> {
    return exchangeWechatCode({
      appId: this.appId,
      appSecret: await this.resolveClientSecret(),
      code,
    });
  }

  override async refresh(refreshToken: string): Promise<WechatTokenSet> {
    if (!refreshToken) {
      throw new Error(i18n.t('refresh_token_empty'));
    }
    return refreshWechatToken({
      appId: this.appId,
      refreshToken,
    });
  }

  override async revoke(
    _token: string,
    _options?: OAuth2Client.RevokeOptions,
  ): Promise<void> {
    throw new Error(i18n.t('revoke_unsupported'));
  }
}
