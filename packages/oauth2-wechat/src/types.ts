import type { CacheAdapter } from '@aomex/cache';
import type { DurationInput } from '@aomex/common';
import type { OAuth2Client } from '@aomex/oauth2-client';
import type { WebContext } from '@aomex/web';

/**
 * 微信 SNS 换票结果（网页授权 / 开放平台）
 * @see https://developers.weixin.qq.com/doc/service/api/webdev/access/api_snsaccesstoken
 * @see https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html
 */
export type WechatTokenSet = Omit<
  OAuth2Client.TokenSet,
  'access_token' | 'token_type' | 'expires_in' | 'refresh_token' | 'scope' | 'id_token'
> & {
  /**
   * 网页授权接口调用凭证。
   * 与公众号全局 `cgi-bin/token`（见 `WechatMpOAuth2Client#getAccessToken`）不同，仅能用于授权用户信息相关接口
   *（如 `/sns/userinfo`、`/sns/auth`），不能调其它业务 API。
   */
  access_token: string;
  /**
   * 兼容 {@link OAuth2Client.TokenSet}；微信 SNS 无此字段，本包装配为 `'bearer'`
   */
  token_type: 'bearer' | 'dpop';
  /** `access_token` 接口调用凭证超时时间，单位秒 */
  expires_in?: number;
  /**
   * 用户刷新 `access_token`。
   * 有效期较长（文档约 30 天）；失效后需用户重新授权
   */
  refresh_token?: string;
  /** 用户授权的作用域，逗号分隔（如 `snsapi_userinfo`） */
  scope?: string;
  /**
   * 用户在该应用下的唯一标识。
   * 未关注服务号时访问网页也会产生 openid
   */
  openid: string;
  /**
   * 用户统一标识（同一开放平台账号下跨应用唯一）。
   * 需将公众号/应用绑定到开放平台后才可能返回
   */
  unionid?: string;
  /**
   * 是否为快照页模式虚拟账号（仅公众号网页授权可能返回，值为 `1`）
   * @see https://developers.weixin.qq.com/doc/service/guide/h5/auth.html
   */
  is_snapshotuser?: number;
  /** 微信 SNS 不返回；保留可选以兼容基类形状时请忽略 */
  id_token?: undefined;
};

/**
 * `/sns/userinfo` 成功结果（需 `snsapi_userinfo` / `snsapi_login`）
 * @see https://developers.weixin.qq.com/doc/service/api/webdev/access/api_snsuserinfo.html
 */
export type WechatSnsUserInfo = {
  /** 用户的唯一标识 */
  openid: string;
  /** 用户昵称 */
  nickname: string;
  /**
   * 用户的性别：`1` 男性，`2` 女性，`0` 未知。
   * 注：受微信能力调整影响，可能不再返回有效性别信息
   */
  sex: number;
  /** 用户个人资料填写的省份 */
  province: string;
  /** 普通用户个人资料填写的城市 */
  city: string;
  /** 国家，如中国为 `CN` */
  country: string;
  /**
   * 用户头像 URL。
   * 最后一个数值代表正方形头像尺寸（有 `0`、`46`、`64`、`96`、`132`；`0` 为 640×640）；
   * 用户无头像时为空；用户更换头像后原 URL 会失效
   */
  headimgurl: string;
  /** 用户特权信息，JSON 数组（如微信沃卡用户为 `chinaunicom`） */
  privilege: string[];
  /**
   * 用户统一标识；仅当公众号/应用已绑定开放平台账号时出现
   */
  unionid?: string;
};

/** 会触发默认拉 `/sns/userinfo` 的 scope */
export type WechatUserinfoScope = 'snsapi_userinfo' | 'snsapi_login';

/** 构造时的 scopes 是否允许拉用户资料 */
export type WechatScopesAllowUserinfo<S extends readonly string[]> =
  Extract<S[number], WechatUserinfoScope> extends never ? false : true;

/**
 * 按构造时 `scopes` 收窄的默认 profile：
 * - 含 `snsapi_userinfo` / `snsapi_login` → `userinfo` 为 {@link WechatSnsUserInfo}
 * - 仅 `snsapi_base` 等 → `userinfo` 为 `null`
 */
export type WechatProfileFromScopes<S extends readonly string[]> =
  WechatScopesAllowUserinfo<S> extends true
    ? { base: WechatTokenSet; userinfo: WechatSnsUserInfo }
    : { base: WechatTokenSet; userinfo: null };

/**
 * 默认 `callback` profile（未按 scopes 收窄时的宽类型）：
 * - `base`：换票令牌，始终有
 * - `userinfo`：已拉资料则为对象，否则 `null`
 */
export type WechatProfile = {
  /** 换票得到的 SNS 令牌与身份主键 */
  base: WechatTokenSet;
  /** 已拉的 `/sns/userinfo`；scope 不足时为 `null` */
  userinfo: WechatSnsUserInfo | null;
};

export type WechatOnProfileArgs = {
  /** 换票令牌 */
  token: WechatTokenSet;
  /** 已按 scopes 拉好的资料；未拉则为 `null` */
  userinfo: WechatSnsUserInfo | null;
  ctx: WebContext;
};

type WechatCommonOptions<Profile = WechatProfile> = {
  /** 对应微信 AppID */
  appId: string;
  /** 对应微信 AppSecret */
  appSecret: string;
  redirectUri: string | ((ctx: WebContext) => string);
  store: CacheAdapter;
  stateTtl?: DurationInput;
  authorizationParams?: Record<string, string>;
  /**
   * 省略时返回 `{ base, userinfo }`。
   * 自定义时框架仍会先按 scopes 拉好 `userinfo`（可能为 `null`）再交给回调。
   */
  onProfile?: (args: WechatOnProfileArgs) => Profile | Promise<Profile>;
};

/** 开放平台网站应用扫码登录 */
export type WechatOpenOptions<
  Scopes extends readonly string[] = readonly string[],
  Profile = WechatProfileFromScopes<Scopes>,
> = WechatCommonOptions<Profile> & {
  /**
   * 必填。网站应用一般为 `['snsapi_login']`（会拉 userinfo）。
   * 传字面量元组时可收窄 `callback` 的 `userinfo` 类型。
   */
  scopes: Scopes;
};

/** 公众号网页授权 */
export type WechatMpOptions<
  Scopes extends readonly ('snsapi_base' | 'snsapi_userinfo')[] = readonly (
    'snsapi_base' | 'snsapi_userinfo'
  )[],
  Profile = WechatProfileFromScopes<Scopes>,
> = WechatCommonOptions<Profile> & {
  /**
   * 必填。`['snsapi_userinfo']` 弹窗并可拉资料；`['snsapi_base']` 静默且 `userinfo` 为 `null`。
   * 传字面量元组时可收窄 `callback` 的 `userinfo` 类型。
   */
  scopes: Scopes;
};
