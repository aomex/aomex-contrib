import { i18n } from './i18n';
import type { WechatMiniProgramLoginOptions, WechatMiniProgramSession } from './types';

const CODE2SESSION_URL = 'https://api.weixin.qq.com/sns/jscode2session';

/**
 * 微信小程序 / 小游戏登录（**不是 OAuth2**）。
 * 仅封装 `jscode2session`：用 `wx.login` 的 code 换 openid / session_key；
 * 无授权跳转、无 state / callback。
 * @see https://developers.weixin.qq.com/miniprogram/dev/server/API/user-login/api_code2session.html
 */
export class WechatMiniProgramLoginClient {
  protected readonly appId: string;
  protected readonly appSecret: string;

  constructor(opts: WechatMiniProgramLoginOptions) {
    if (!opts.appId) {
      throw new Error(i18n.t('app_id_empty'));
    }
    if (!opts.appSecret) {
      throw new Error(i18n.t('app_secret_empty'));
    }
    this.appId = opts.appId;
    this.appSecret = opts.appSecret;
  }

  /**
   * 用 `wx.login` 得到的 `js_code` 换取 openid / session_key
   */
  async code2Session(jsCode: string): Promise<WechatMiniProgramSession> {
    if (!jsCode) {
      throw new Error(i18n.t('js_code_empty'));
    }

    const url = new URL(CODE2SESSION_URL);
    url.searchParams.set('appid', this.appId);
    url.searchParams.set('secret', this.appSecret);
    url.searchParams.set('js_code', jsCode);
    url.searchParams.set('grant_type', 'authorization_code');

    const res = await fetch(url);
    let json: { errcode?: number; errmsg?: string; [key: string]: unknown };
    try {
      json = (await res.json()) as typeof json;
    } catch {
      throw new Error(
        i18n.t('code2session_failed', {
          errcode: String(res.status),
          errmsg: 'invalid json',
        }),
      );
    }

    if (typeof json.errcode === 'number' && json.errcode !== 0) {
      throw new Error(
        i18n.t('code2session_failed', {
          errcode: String(json.errcode),
          errmsg: json.errmsg ?? '',
        }),
      );
    }

    if (
      typeof json['openid'] !== 'string' ||
      !json['openid'] ||
      typeof json['session_key'] !== 'string' ||
      !json['session_key']
    ) {
      throw new Error(
        i18n.t('code2session_failed', { errcode: '?', errmsg: 'missing fields' }),
      );
    }

    return {
      openid: json['openid'],
      session_key: json['session_key'],
      unionid: typeof json['unionid'] === 'string' ? json['unionid'] : undefined,
    };
  }
}
