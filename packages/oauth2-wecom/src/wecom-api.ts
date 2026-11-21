import type { CacheAdapter } from '@aomex/cache';
import { Caching } from '@aomex/cache';
import { i18n } from './i18n';
import type { WecomTokenSet } from './types';

export const WECOM_AUTHORIZE = 'https://open.weixin.qq.com/connect/oauth2/authorize';
export const WECOM_GET_TOKEN_URL = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken';
/** 自建 / 代开发应用：用 code 换成员身份 */
export const WECOM_GET_USERINFO_URL =
  'https://qyapi.weixin.qq.com/cgi-bin/auth/getuserinfo';

type WecomErrorBody = {
  errcode?: number;
  errmsg?: string;
};

type CorpTokenCache = {
  access_token: string;
};

/**
 * 相对企微返回的 `expires_in` 提前失效的秒数，避免边界过期。
 * 实际缓存 TTL = max(60, expires_in - CORP_TOKEN_SKEW_SEC)；
 * 企微默认 expires_in=7200，故常见 TTL 为 6900 秒（约 1h55m）。
 */
const CORP_TOKEN_SKEW_SEC = 300;

/**
 * 获取并缓存企业应用 access_token（勿下发前端）。
 * 写入调用方传入的 `store`（内存 / Redis 等）。
 * 缓存 key：`cacheKey` 优先，否则 `corpTokenCacheKey(corpId, agentId)`
 *（有 agentId 时为 `wecom:corp_token:${corpId}:${agentId}`，否则 `wecom:corp_token:${corpId}`）。
 * 缓存时间：`max(60, expires_in - 300)` 秒；`expires_in` 缺省按 7200 处理。
 * @see https://developer.work.weixin.qq.com/document/path/91039
 */
export async function getWecomCorpToken(input: {
  corpId: string;
  corpSecret: string;
  store: CacheAdapter;
  /**
   * 应用 AgentId。多应用共用 CorpID 时应传入，避免不同 `corpSecret` 的 token 互相覆盖。
   * 与 `WecomOAuth2Client` 内部键一致。
   */
  agentId?: string | number;
  /** 覆盖默认缓存键；一般无需设置 */
  cacheKey?: string;
}): Promise<string> {
  const caching = new Caching(input.store);
  const key = resolveCorpTokenCacheKey(input);
  const cached = await caching.get<CorpTokenCache>(key);
  if (cached?.access_token) {
    return cached.access_token;
  }

  const url = new URL(WECOM_GET_TOKEN_URL);
  url.searchParams.set('corpid', input.corpId);
  url.searchParams.set('corpsecret', input.corpSecret);

  const json = await fetchWecomJson(url, 'corp_token_failed');
  assertWecomOk(json, 'corp_token_failed');

  if (typeof json['access_token'] !== 'string' || !json['access_token']) {
    throw new Error(
      i18n.t('corp_token_failed', {
        errcode: '?',
        errmsg: 'missing access_token',
      }),
    );
  }

  const expiresIn =
    typeof json['expires_in'] === 'number' && json['expires_in'] > 0
      ? json['expires_in']
      : 7200;
  const ttlSec = Math.max(60, expiresIn - CORP_TOKEN_SKEW_SEC);
  await caching.set(
    key,
    { access_token: json['access_token'] } satisfies CorpTokenCache,
    ttlSec * 1000,
  );

  return json['access_token'];
}

/**
 * 清除企业应用 access_token 缓存。
 * - `invalidateWecomCorpToken(store, corpId)` → 删 `wecom:corp_token:${corpId}`
 * - `invalidateWecomCorpToken(store, corpId, { agentId })` → 与客户端键对齐
 * - 第三参为 string 时视为自定义 `cacheKey`（兼容旧用法）
 */
export async function invalidateWecomCorpToken(
  store: CacheAdapter,
  corpId: string,
  cacheKeyOrOpts?: string | { agentId?: string | number; cacheKey?: string },
): Promise<void> {
  const caching = new Caching(store);
  const key =
    typeof cacheKeyOrOpts === 'string'
      ? cacheKeyOrOpts
      : resolveCorpTokenCacheKey({ corpId, ...cacheKeyOrOpts });
  await caching.delete(key);
}

/**
 * 用网页授权 code 换取访问用户身份
 * @see https://developer.work.weixin.qq.com/document/path/96442
 */
export async function getWecomUserInfo(input: {
  accessToken: string;
  code: string;
}): Promise<WecomTokenSet> {
  const url = new URL(WECOM_GET_USERINFO_URL);
  url.searchParams.set('access_token', input.accessToken);
  url.searchParams.set('code', input.code);

  const json = await fetchWecomJson(url, 'userinfo_failed');
  assertWecomOk(json, 'userinfo_failed');

  const userid =
    typeof json['userid'] === 'string' && json['userid'] ? json['userid'] : undefined;
  const openid =
    typeof json['openid'] === 'string' && json['openid'] ? json['openid'] : undefined;
  const user_ticket =
    typeof json['user_ticket'] === 'string' && json['user_ticket']
      ? json['user_ticket']
      : undefined;
  const external_userid =
    typeof json['external_userid'] === 'string' && json['external_userid']
      ? json['external_userid']
      : undefined;

  if (!userid && !openid) {
    throw new Error(i18n.t('userinfo_missing_identity'));
  }

  return {
    // 兼容 TokenSet：无用户 OAuth access_token，有则回填 user_ticket
    access_token: user_ticket ?? '',
    token_type: 'bearer',
    userid,
    user_ticket,
    openid,
    external_userid,
  };
}

/**
 * 完整换票：corp token（可缓存）+ code → 身份
 * 若 getuserinfo 因 token 失效失败，会清缓存并重试一次
 */
export async function exchangeWecomCode(input: {
  corpId: string;
  corpSecret: string;
  code: string;
  store: CacheAdapter;
  /** 与 `getWecomCorpToken` 相同；多应用时建议传入 */
  agentId?: string | number;
  cacheKey?: string;
}): Promise<WecomTokenSet> {
  const run = async (forceRefresh: boolean) => {
    if (forceRefresh) {
      await invalidateWecomCorpToken(input.store, input.corpId, {
        agentId: input.agentId,
        cacheKey: input.cacheKey,
      });
    }
    const accessToken = await getWecomCorpToken({
      corpId: input.corpId,
      corpSecret: input.corpSecret,
      store: input.store,
      agentId: input.agentId,
      cacheKey: input.cacheKey,
    });
    return getWecomUserInfo({ accessToken, code: input.code });
  };

  try {
    return await run(false);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    // 40014 invalid access_token / 42001 access_token expired
    if (msg.includes('40014') || msg.includes('42001')) {
      return run(true);
    }
    throw err;
  }
}

export function corpTokenCacheKey(corpId: string, agentId?: string | number): string {
  return agentId === undefined || agentId === ''
    ? `wecom:corp_token:${corpId}`
    : `wecom:corp_token:${corpId}:${agentId}`;
}

function resolveCorpTokenCacheKey(input: {
  corpId: string;
  agentId?: string | number;
  cacheKey?: string;
}): string {
  return input.cacheKey ?? corpTokenCacheKey(input.corpId, input.agentId);
}

async function fetchWecomJson(
  url: URL,
  errorKey: 'corp_token_failed' | 'userinfo_failed',
): Promise<Record<string, unknown> & WecomErrorBody> {
  const res = await fetch(url);
  try {
    return (await res.json()) as Record<string, unknown> & WecomErrorBody;
  } catch {
    throw new Error(
      i18n.t(errorKey, {
        errcode: String(res.status),
        errmsg: 'invalid json',
      }),
    );
  }
}

function assertWecomOk(
  json: WecomErrorBody,
  errorKey: 'corp_token_failed' | 'userinfo_failed',
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
