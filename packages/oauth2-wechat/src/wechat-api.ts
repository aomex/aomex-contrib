import { i18n } from './i18n';
import type { WechatSnsUserInfo, WechatTokenSet } from './types';

export const WECHAT_TOKEN_URL = 'https://api.weixin.qq.com/sns/oauth2/access_token';
export const WECHAT_REFRESH_URL = 'https://api.weixin.qq.com/sns/oauth2/refresh_token';
export const WECHAT_USERINFO_URL = 'https://api.weixin.qq.com/sns/userinfo';

export const WECHAT_OPEN_AUTHORIZE = 'https://open.weixin.qq.com/connect/qrconnect';
export const WECHAT_MP_AUTHORIZE = 'https://open.weixin.qq.com/connect/oauth2/authorize';

type WechatErrorBody = {
  errcode?: number;
  errmsg?: string;
};

export async function exchangeWechatCode(input: {
  appId: string;
  appSecret: string;
  code: string;
}): Promise<WechatTokenSet> {
  const url = new URL(WECHAT_TOKEN_URL);
  url.searchParams.set('appid', input.appId);
  url.searchParams.set('secret', input.appSecret);
  url.searchParams.set('code', input.code);
  url.searchParams.set('grant_type', 'authorization_code');

  const json = await fetchWechatJson(url, 'token_failed');
  return parseWechatToken(json, 'token_failed');
}

export async function refreshWechatToken(input: {
  appId: string;
  refreshToken: string;
}): Promise<WechatTokenSet> {
  const url = new URL(WECHAT_REFRESH_URL);
  url.searchParams.set('appid', input.appId);
  url.searchParams.set('grant_type', 'refresh_token');
  url.searchParams.set('refresh_token', input.refreshToken);

  const json = await fetchWechatJson(url, 'refresh_failed');
  return parseWechatToken(json, 'refresh_failed');
}

async function fetchWechatJson(
  url: URL,
  errorKey: 'token_failed' | 'refresh_failed' | 'userinfo_failed' = 'token_failed',
): Promise<Record<string, unknown> & WechatErrorBody> {
  const res = await fetch(url);
  try {
    return (await res.json()) as Record<string, unknown> & WechatErrorBody;
  } catch {
    throw new Error(
      i18n.t(errorKey, {
        errcode: String(res.status),
        errmsg: 'invalid json',
      }),
    );
  }
}

/**
 * 拉取 SNS 用户信息（需 `snsapi_userinfo` 或开放平台 `snsapi_login`）
 * @see https://developers.weixin.qq.com/doc/service/api/webdev/access/api_snsuserinfo.html
 */
export async function fetchWechatUserInfo(input: {
  accessToken: string;
  openid: string;
  lang?: string;
}): Promise<WechatSnsUserInfo> {
  const url = new URL(WECHAT_USERINFO_URL);
  url.searchParams.set('access_token', input.accessToken);
  url.searchParams.set('openid', input.openid);
  url.searchParams.set('lang', input.lang ?? 'zh_CN');

  const json = await fetchWechatJson(url, 'userinfo_failed');
  assertWechatOk(json, 'userinfo_failed');

  if (typeof json['openid'] !== 'string' || !json['openid']) {
    throw new Error(
      i18n.t('userinfo_failed', { errcode: '?', errmsg: 'missing openid' }),
    );
  }

  return {
    openid: json['openid'],
    nickname: typeof json['nickname'] === 'string' ? json['nickname'] : '',
    sex: typeof json['sex'] === 'number' ? json['sex'] : 0,
    province: typeof json['province'] === 'string' ? json['province'] : '',
    city: typeof json['city'] === 'string' ? json['city'] : '',
    country: typeof json['country'] === 'string' ? json['country'] : '',
    headimgurl: typeof json['headimgurl'] === 'string' ? json['headimgurl'] : '',
    privilege: Array.isArray(json['privilege'])
      ? json['privilege'].filter((x): x is string => typeof x === 'string')
      : [],
    unionid: typeof json['unionid'] === 'string' ? json['unionid'] : undefined,
  };
}

/** scope 是否允许调用 `/sns/userinfo` */
export function wechatScopeAllowsUserinfo(scope: string | undefined): boolean {
  if (!scope) return false;
  return scope
    .split(/[,\s]+/)
    .filter(Boolean)
    .some((s) => s === 'snsapi_userinfo' || s === 'snsapi_login');
}

function parseWechatToken(
  json: Record<string, unknown> & WechatErrorBody,
  errorKey: 'token_failed' | 'refresh_failed',
): WechatTokenSet {
  assertWechatOk(json, errorKey);

  if (
    typeof json['access_token'] !== 'string' ||
    !json['access_token'] ||
    typeof json['openid'] !== 'string' ||
    !json['openid']
  ) {
    throw new Error(
      i18n.t(errorKey, { errcode: '?', errmsg: 'missing access_token/openid' }),
    );
  }

  return {
    access_token: json['access_token'],
    token_type: 'bearer',
    expires_in: typeof json['expires_in'] === 'number' ? json['expires_in'] : undefined,
    refresh_token:
      typeof json['refresh_token'] === 'string' ? json['refresh_token'] : undefined,
    scope: typeof json['scope'] === 'string' ? json['scope'] : undefined,
    openid: json['openid'],
    unionid: typeof json['unionid'] === 'string' ? json['unionid'] : undefined,
    is_snapshotuser:
      typeof json['is_snapshotuser'] === 'number' ? json['is_snapshotuser'] : undefined,
  };
}

function assertWechatOk(
  json: WechatErrorBody,
  errorKey: 'token_failed' | 'refresh_failed' | 'userinfo_failed',
): void {
  if (typeof json.errcode === 'number' && json.errcode !== 0) {
    throw new Error(
      i18n.t(errorKey, {
        errcode: String(json.errcode),
        errmsg: json.errmsg ?? '',
      }),
    );
  }
}
