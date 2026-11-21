import { WECHAT_MP_AUTHORIZE } from './wechat-api';
import { WechatOAuth2Client } from './wechat-oauth-client';
import type { WechatMpOptions, WechatProfileFromScopes } from './types';

/**
 * 微信公众号网页授权
 * @see https://developers.weixin.qq.com/doc/service/guide/h5/auth.html
 */
export class WechatMpOAuth2Client<
  const Scopes extends readonly ('snsapi_base' | 'snsapi_userinfo')[] = readonly (
    'snsapi_base' | 'snsapi_userinfo'
  )[],
  Profile = WechatProfileFromScopes<Scopes>,
> extends WechatOAuth2Client<Profile> {
  constructor(opts: WechatMpOptions<Scopes, Profile>) {
    super({
      appId: opts.appId,
      appSecret: opts.appSecret,
      redirectUri: opts.redirectUri,
      store: opts.store,
      stateTtl: opts.stateTtl,
      authorizationParams: opts.authorizationParams,
      onProfile: opts.onProfile,
      authorizationEndpoint: WECHAT_MP_AUTHORIZE,
      scopes: opts.scopes,
    });
  }
}
