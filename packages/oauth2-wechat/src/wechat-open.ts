import { WECHAT_OPEN_AUTHORIZE } from './wechat-api';
import { WechatOAuth2Client } from './wechat-oauth-client';
import type { WechatOpenOptions, WechatProfileFromScopes } from './types';

/**
 * 微信开放平台网站应用扫码登录
 * @see https://developers.weixin.qq.com/doc/oplatform/developers/dev/auth/web.html
 */
export class WechatOpenOAuth2Client<
  const Scopes extends readonly string[] = readonly string[],
  Profile = WechatProfileFromScopes<Scopes>,
> extends WechatOAuth2Client<Profile> {
  constructor(opts: WechatOpenOptions<Scopes, Profile>) {
    super({
      appId: opts.appId,
      appSecret: opts.appSecret,
      redirectUri: opts.redirectUri,
      store: opts.store,
      stateTtl: opts.stateTtl,
      authorizationParams: opts.authorizationParams,
      onProfile: opts.onProfile,
      authorizationEndpoint: WECHAT_OPEN_AUTHORIZE,
      scopes: opts.scopes,
    });
  }
}
