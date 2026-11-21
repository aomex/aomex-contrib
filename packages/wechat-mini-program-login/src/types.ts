export type WechatMiniProgramLoginOptions = {
  /** 小程序 AppID */
  appId: string;
  /** 小程序 AppSecret */
  appSecret: string;
};

/**
 * `jscode2session` 成功结果（**非 OAuth**）
 * @see https://developers.weixin.qq.com/miniprogram/dev/server/API/user-login/api_code2session.html
 */
export type WechatMiniProgramSession = {
  /** 用户唯一标识 */
  openid: string;
  /** 会话密钥 */
  session_key: string;
  /**
   * 用户在开放平台的唯一标识。
   * 满足 UnionID 下发条件时返回
   */
  unionid?: string;
};
