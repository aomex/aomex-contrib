import type { Caching } from '@aomex/cache';
import type { DurationInput } from '@aomex/common';
import type { WebContext } from '@aomex/web';

/**
 * 企微 `auth/getuserinfo` 身份字段（亦为默认 `callback` 返回值）。
 * 调企微业务 API 请用客户端的 `getAccessToken()`，此处不含应用令牌。
 * @see https://developer.work.weixin.qq.com/document/path/91023
 */
export type WecomProfile = {
  /** 成员 UserId（企业内成员） */
  userid?: string;
  /**
   * 成员票据（`snsapi_privateinfo` 且在可见范围时可能有）
   * @see https://developer.work.weixin.qq.com/document/path/95833
   */
  user_ticket?: string;
  /** 非企业成员时的标识 */
  openid?: string;
  /** 外部联系人场景可能有 */
  external_userid?: string;
};

export type WecomOnProfileArgs = {
  /** `auth/getuserinfo` 得到的身份 */
  profile: WecomProfile;
  ctx: WebContext;
};

export type WecomScope = 'snsapi_base' | 'snsapi_privateinfo';

/**
 * 企业微信自建应用网页授权
 * @see https://developer.work.weixin.qq.com/document/path/91022
 */
export type WecomOAuth2Options<
  Scopes extends readonly WecomScope[] = readonly WecomScope[],
  Profile = WecomProfile,
> = {
  /** 企业 CorpID（授权链接里的 appid） */
  corpId: string;
  /** 应用 Secret */
  corpSecret: string;
  /** 应用 AgentId */
  agentId: string | number;
  redirectUri: string | ((ctx: WebContext) => string);
  store: Caching;
  stateTtl?: DurationInput;
  /**
   * 必填。`['snsapi_base']` 静默；`['snsapi_privateinfo']` 可拿敏感信息（须带 agentId）
   */
  scopes: Scopes;
  authorizationParams?: Record<string, string>;
  /**
   * 省略时 `callback` 直接返回 {@link WecomProfile}。
   */
  onProfile?: (args: WecomOnProfileArgs) => Profile | Promise<Profile>;
};
