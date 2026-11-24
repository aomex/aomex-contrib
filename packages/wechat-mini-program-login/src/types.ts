import type { CacheAdapter } from '@aomex/cache';

export type WechatMiniProgramLoginOptions = {
  /** 小程序 AppID */
  appId: string;
  /** 小程序 AppSecret */
  appSecret: string;
  /**
   * 缓存适配器，用于缓存小程序全局 `access_token`
   *（`getAccessToken` / `getPhoneNumber` 依赖）。
   * 首次读写 token 缓存时经 `registerLifecycle` 调用 `connect`，关停时 `disconnect`
   */
  store: CacheAdapter;
};

/**
 * `jscode2session` 成功结果（**非 OAuth**）
 * @see https://developers.weixin.qq.com/miniprogram/dev/server/API/user-login/api_code2session.html
 */
export type WechatMiniProgramSession = {
  /** 用户在该小程序下的唯一标识，可作业务用户主键 */
  openid: string;
  /**
   * 用户会话密钥，基本用不上了，可忽略（仅服务端保存，**勿下发前端**）。
   *
   * 用途：校验 / 解密微信下发的开放数据（如旧版 `encryptedData` AES 解密、
   * `sha1(rawData + session_key)` 验签）。与应用级 `access_token` 不同，它绑定单次
   * `wx.login` 会话，过期需用户重新登录再换。
   *
   * 新版 `getPhoneNumber` **不需要** `session_key`；仅做静默登录 + 新版手机号时
   *
   */
  session_key: string;
  /**
   * 同一开放平台下多应用（公众号 / 小程序）的统一用户标识。
   * 小程序已绑定开放平台且满足下发条件时才有
   */
  unionid?: string;
};

/**
 * 新版手机号接口返回的 `phone_info`
 * @see https://developers.weixin.qq.com/miniprogram/dev/server/API/user-info/phone-number/api_getphonenumber.html
 */
export type WechatMiniProgramPhoneInfo = {
  /** 用户绑定的手机号（含区号） */
  phoneNumber: string;
  /** 没有区号的手机号 */
  purePhoneNumber: string;
  /** 区号 */
  countryCode: string;
  /** 数据水印，用于校验来源与时效 */
  watermark: {
    /** 用户获取手机号操作的时间戳（秒） */
    timestamp: number;
    /** 小程序 appid，应与当前应用一致 */
    appid: string;
  };
};
