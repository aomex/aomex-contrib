import type { JWTVerifyGetKey } from 'jose';

/**
 * Google Identity Services 登录后端选项
 * @see https://developers.google.com/identity/gsi/web/guides/overview
 */
export type GoogleIdentityLoginOptions = {
  /**
   * OAuth 客户端 ID（Web）
   * 须与前端 GIS 初始化的 `client_id` 一致；
   * 亦用于 `exchangeAuthCode` / `refreshAccessToken`
   */
  clientId: string;
  /**
   * OAuth 客户端密钥。
   * `exchangeAuthCode` / `refreshAccessToken` 需要
   */
  clientSecret?: string;
  /**
   * 额外允许的 audience（如 iOS / Android 客户端 ID）。
   * 验签时 `aud` 可命中 `clientId` 或本列表任一值
   */
  audiences?: string[];
  /**
   * 限制 Google Workspace 托管域名。
   * 设置后 claims.`hd` 必须匹配（个人账号无 `hd` 时会失败）
   * @see https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
   */
  hd?: string | string[];
  /**
   * 覆盖 Google JWKS 地址；默认 `https://www.googleapis.com/oauth2/v3/certs`
   */
  jwksUri?: string;
  /**
   * 自定义验签密钥解析（测试可注入 `createLocalJWKSet`）
   */
  jwks?: JWTVerifyGetKey;
  /**
   * `exchangeAuthCode` 使用的 `redirect_uri`。
   * GIS popup（`initCodeClient`）默认为 `postmessage`
   * @see https://developers.google.com/identity/oauth2/web/guides/use-code-model
   */
  authCodeRedirectUri?: string;
};

/**
 * 已验签的 Google `id_token` / credential claims
 * @see https://developers.google.com/identity/openid-connect/openid-connect#an-id-tokens-payload
 */
export type GoogleIdentityClaims = {
  /** 签发方：`https://accounts.google.com` 或 `accounts.google.com` */
  iss: string;
  /** 用户稳定 ID（应用内主键请用此字段） */
  sub: string;
  /** 接收方（audience），须等于你的 `clientId` */
  aud: string | string[];
  /** 签发时间（Unix 秒） */
  iat: number;
  /** 过期时间（Unix 秒） */
  exp: number;
  /** 邮箱 */
  email?: string;
  /** 邮箱是否已验证（布尔或字符串，视 Google 返回而定） */
  email_verified?: boolean | 'true' | 'false';
  /** 显示名 */
  name?: string;
  /** 头像 URL */
  picture?: string;
  /** 名 */
  given_name?: string;
  /** 姓 */
  family_name?: string;
  /** Google Workspace 托管域名；个人账号通常无此字段 */
  hd?: string;
  /** 授权方的 client_id（Web + App 等混合场景可能有） */
  azp?: string;
  /** 语言区域 */
  locale?: string;
  /** 访问令牌绑定哈希（若有） */
  at_hash?: string;
  /** 防重放随机串（授权请求带了 `nonce` 时才有） */
  nonce?: string;
};

/**
 * `GET https://www.googleapis.com/oauth2/v3/userinfo` 常见字段
 * @see https://developers.google.com/identity/openid-connect/openid-connect#obtainuserinfo
 */
export type GoogleUserInfo = {
  /** 用户稳定 ID（同 id_token 的 `sub`） */
  sub: string;
  /** 邮箱 */
  email?: string;
  /** 邮箱是否已验证 */
  email_verified?: boolean;
  /** 显示名 */
  name?: string;
  /** 头像 URL */
  picture?: string;
  /** 名 */
  given_name?: string;
  /** 姓 */
  family_name?: string;
  /** 语言区域 */
  locale?: string;
  /** Google Workspace 托管域名 */
  hd?: string;
};

/**
 * GIS `flow: 'auth-code'` 换票结果
 * @see https://developers.google.com/identity/protocols/oauth2/openid-connect#exchangecode
 */
export type GoogleAuthCodeTokenSet = {
  /** 调用 Google API 的访问令牌 */
  access_token: string;
  /** 令牌类型；一般为 `Bearer`（大小写以 Google 返回为准，本包透传） */
  token_type: string;
  /** 过期秒数 */
  expires_in?: number;
  /** 刷新令牌（首次同意且含 offline 相关授权时可能有） */
  refresh_token?: string;
  /** 授权范围 */
  scope?: string;
  /**
   * 身份令牌（JWT）。
   * 授权 scope 含 `openid` 时通常有；纯 API 授权或未带 `openid` 时可能没有
   */
  id_token?: string;
};
