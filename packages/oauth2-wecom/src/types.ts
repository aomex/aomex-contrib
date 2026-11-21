import type { CacheAdapter } from '@aomex/cache';
import type { DurationInput } from '@aomex/common';
import type { OAuth2Client } from '@aomex/oauth2-client';
import type { WebContext } from '@aomex/web';

/**
 * 换票内部 TokenSet（兼容 {@link OAuth2Client.TokenSet}）。
 * `access_token` **不是**应用令牌，也**不是**用户 OAuth token，仅为占位（有则填 `user_ticket`，否则 `''`）。
 * 业务请用 {@link WecomProfile} / `userid` / `openid`；调企微 API 用客户端的 `getCorpAccessToken()`。
 * @see https://developer.work.weixin.qq.com/document/path/91023
 */
export type WecomTokenSet = Omit<
  OAuth2Client.TokenSet,
  'access_token' | 'token_type' | 'expires_in' | 'refresh_token' | 'scope' | 'id_token'
> & {
  /**
   * **占位字段**：有 `user_ticket` 时填入，否则为 `''`。
   * 不要当作应用 `access_token` 或用户 SNS token 使用
   */
  access_token: string;
  /** 兼容基类；本包装配为 `'bearer'` */
  token_type: 'bearer' | 'dpop';
  /** 企微网页授权无用户级 expires_in；一般不存在 */
  expires_in?: undefined;
  /** 企微网页授权无用户级 refresh_token；一般不存在 */
  refresh_token?: undefined;
  /** 企微网页授权不在此字段回传 scope；一般不存在 */
  scope?: undefined;
  /** 企微网页授权无 id_token */
  id_token?: undefined;
  /**
   * 成员 UserId（企业内成员）
   * @see https://developer.work.weixin.qq.com/document/path/91023
   */
  userid?: string;
  /**
   * 成员票据（`snsapi_privateinfo` 且在应用可见范围时可能返回），可用于再拉敏感信息
   * @see https://developer.work.weixin.qq.com/document/path/95833
   */
  user_ticket?: string;
  /**
   * 非企业成员时的标识（以企微当前文档为准）
   */
  openid?: string;
  /**
   * 外部联系人场景可能返回的外部联系人 userid
   */
  external_userid?: string;
};

/**
 * 默认 `callback` profile：企微身份字段（不含伪装的 OAuth access_token）
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
  /** 内部换票 TokenSet（含占位 `access_token`） */
  token: WecomTokenSet;
  /** 已去掉伪装 access_token 的身份字段 */
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
  store: CacheAdapter;
  stateTtl?: DurationInput;
  /**
   * 必填。`['snsapi_base']` 静默；`['snsapi_privateinfo']` 可拿敏感信息（须带 agentId）
   */
  scopes: Scopes;
  authorizationParams?: Record<string, string>;
  /**
   * 省略时返回 {@link WecomProfile}。
   * 自定义时 `profile` 已是去掉伪装 access_token 的身份字段。
   */
  onProfile?: (args: WecomOnProfileArgs) => Profile | Promise<Profile>;
};
