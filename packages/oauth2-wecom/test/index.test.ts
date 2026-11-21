import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { afterEach, expect, test, vi } from 'vitest';
import {
  WECOM_AUTHORIZE,
  WECOM_GET_TOKEN_URL,
  WECOM_GET_USERINFO_URL,
  WecomOAuth2Client,
  corpTokenCacheKey,
  exchangeWecomCode,
  getWecomCorpToken,
  invalidateWecomCorpToken,
} from '../src';
import { i18n } from '../src/i18n';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function mockCtx(query: Record<string, string> = {}) {
  return {
    request: { query, body: undefined },
  } as never;
}

function stubJsonFetch(handler: (url: URL) => unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: string | URL) => {
      const url = new URL(String(input));
      return {
        ok: true,
        status: 200,
        json: async () => handler(url),
      };
    }),
  );
}

test('构造：空 corpId / corpSecret / agentId 抛错', () => {
  const store = new CacheMemoryAdapter();
  const base = {
    redirectUri: 'https://example.com/cb',
    store,
    onProfile: async () => ({}),
  };

  expect(
    () =>
      new WecomOAuth2Client({
        ...base,
        scopes: ['snsapi_base'],
        corpId: '',
        corpSecret: 'sec',
        agentId: 1000002,
      }),
  ).toThrow(i18n.t('corp_id_empty'));

  expect(
    () =>
      new WecomOAuth2Client({
        ...base,
        scopes: ['snsapi_base'],
        corpId: 'ww',
        corpSecret: '',
        agentId: 1000002,
      }),
  ).toThrow(i18n.t('corp_secret_empty'));

  expect(
    () =>
      new WecomOAuth2Client({
        ...base,
        scopes: ['snsapi_base'],
        corpId: 'ww',
        corpSecret: 'sec',
        agentId: '',
      }),
  ).toThrow(i18n.t('agent_id_empty'));
});

test('授权 URL：appid=corpId、默认 snsapi_base、agentid、#wechat_redirect、参数顺序', async () => {
  const client = new WecomOAuth2Client({
    corpId: 'ww_corp',
    corpSecret: 'sec',
    agentId: 1000002,
    redirectUri: 'https://example.com/cb',
    store: new CacheMemoryAdapter(),
    scopes: ['snsapi_base'],
    onProfile: async ({ token }) => token.userid,
  });

  const raw = await client.getAuthorizationUrl(mockCtx());
  expect(raw.endsWith('#wechat_redirect')).toBe(true);
  const url = new URL(raw.replace(/#wechat_redirect$/, ''));
  expect(url.origin + url.pathname).toBe(WECOM_AUTHORIZE);
  expect(url.searchParams.get('appid')).toBe('ww_corp');
  expect(url.searchParams.get('client_id')).toBeNull();
  expect(url.searchParams.get('redirect_uri')).toBe('https://example.com/cb');
  expect(url.searchParams.get('response_type')).toBe('code');
  expect(url.searchParams.get('scope')).toBe('snsapi_base');
  expect(url.searchParams.get('agentid')).toBe('1000002');
  expect(url.searchParams.get('code_challenge')).toBeNull();
  expect(url.searchParams.get('state')).toMatch(/^[A-Za-z0-9_-]+$/);
  expect([...url.searchParams.keys()]).toEqual([
    'appid',
    'redirect_uri',
    'response_type',
    'scope',
    'state',
    'agentid',
  ]);
});

test('authorizationParams 附加在 agentid 后；忽略覆盖必填字段', async () => {
  const client = new WecomOAuth2Client({
    corpId: 'ww_corp',
    corpSecret: 'sec',
    agentId: 1,
    redirectUri: 'https://example.com/cb',
    store: new CacheMemoryAdapter(),
    scopes: ['snsapi_privateinfo'],
    authorizationParams: {
      foo: 'bar',
      appid: 'ignored',
      agentid: 'ignored',
    },
    onProfile: async ({ token }) => token.userid,
  });

  const raw = await client.getAuthorizationUrl(mockCtx());
  const url = new URL(raw.replace(/#wechat_redirect$/, ''));
  expect(url.searchParams.get('scope')).toBe('snsapi_privateinfo');
  expect(url.searchParams.get('appid')).toBe('ww_corp');
  expect(url.searchParams.get('agentid')).toBe('1');
  expect(url.searchParams.get('foo')).toBe('bar');
  expect([...url.searchParams.keys()]).toEqual([
    'appid',
    'redirect_uri',
    'response_type',
    'scope',
    'state',
    'agentid',
    'foo',
  ]);
});

test('callback：gettoken + getuserinfo；默认 onProfile 返回 WecomProfile', async () => {
  const store = new CacheMemoryAdapter();
  const client = new WecomOAuth2Client({
    scopes: ['snsapi_base'],
    corpId: 'ww_corp',
    corpSecret: 'sec',
    agentId: 1000002,
    redirectUri: 'https://example.com/cb',
    store,
  });

  const raw = await client.getAuthorizationUrl(mockCtx());
  const state = new URL(raw.replace(/#wechat_redirect$/, '')).searchParams.get('state')!;

  const paths: string[] = [];
  stubJsonFetch((url) => {
    const path = url.origin + url.pathname;
    paths.push(path);
    if (path === WECOM_GET_TOKEN_URL) {
      expect(url.searchParams.get('corpid')).toBe('ww_corp');
      expect(url.searchParams.get('corpsecret')).toBe('sec');
      return {
        errcode: 0,
        access_token: 'corp_at',
        token_type: 'bearer',
        expires_in: 7200,
      };
    }
    if (path === WECOM_GET_USERINFO_URL) {
      expect(url.searchParams.get('access_token')).toBe('corp_at');
      expect(url.searchParams.get('code')).toBe('wx-code');
      return {
        errcode: 0,
        userid: 'ZhangSan',
        user_ticket: 'ticket',
      };
    }
    throw new Error(`unexpected ${path}`);
  });

  const profile = await client.callback(mockCtx({ code: 'wx-code', state }));
  expect(profile).toEqual({
    userid: 'ZhangSan',
    user_ticket: 'ticket',
    openid: undefined,
    external_userid: undefined,
  });
  expect(paths).toEqual([WECOM_GET_TOKEN_URL, WECOM_GET_USERINFO_URL]);

  // corp token 已缓存，再次 getCorpAccessToken 不再请求
  paths.length = 0;
  await expect(client.getCorpAccessToken()).resolves.toBe('corp_at');
  expect(paths).toEqual([]);
});

test('非企业成员：返回 openid', async () => {
  stubJsonFetch((url) => {
    if (url.pathname.endsWith('/gettoken')) {
      return { errcode: 0, access_token: 'at', expires_in: 7200 };
    }
    return {
      errcode: 0,
      openid: 'EXT_OPENID',
      external_userid: 'ext_1',
    };
  });

  const token = await exchangeWecomCode({
    corpId: 'ww',
    corpSecret: 'sec',
    code: 'c',
    store: new CacheMemoryAdapter(),
  });
  expect(token).toEqual({
    access_token: '',
    token_type: 'bearer',
    userid: undefined,
    user_ticket: undefined,
    openid: 'EXT_OPENID',
    external_userid: 'ext_1',
  });
});

test('gettoken / getuserinfo 失败 errcode', async () => {
  stubJsonFetch(() => ({ errcode: 40013, errmsg: 'invalid corpid' }));
  await expect(
    getWecomCorpToken({
      corpId: 'bad',
      corpSecret: 'sec',
      store: new CacheMemoryAdapter(),
    }),
  ).rejects.toThrow(
    i18n.t('corp_token_failed', { errcode: '40013', errmsg: 'invalid corpid' }),
  );

  const store = new CacheMemoryAdapter();
  const client = new WecomOAuth2Client({
    scopes: ['snsapi_base'],
    corpId: 'ww',
    corpSecret: 'sec',
    agentId: 1,
    redirectUri: 'https://example.com/cb',
    store,
    onProfile: async ({ token }) => token.userid,
  });
  const raw = await client.getAuthorizationUrl(mockCtx());
  const state = new URL(raw.replace(/#wechat_redirect$/, '')).searchParams.get('state')!;

  stubJsonFetch((url) => {
    if (url.pathname.endsWith('/gettoken')) {
      return { errcode: 0, access_token: 'at', expires_in: 7200 };
    }
    return { errcode: 40029, errmsg: 'invalid code' };
  });
  await expect(client.callback(mockCtx({ code: 'bad', state }))).rejects.toThrow(
    i18n.t('userinfo_failed', { errcode: '40029', errmsg: 'invalid code' }),
  );
});

test('access_token 失效时清缓存并重试 getuserinfo', async () => {
  const store = new CacheMemoryAdapter();
  let tokenCalls = 0;
  let userCalls = 0;

  stubJsonFetch((url) => {
    if (url.pathname.endsWith('/gettoken')) {
      tokenCalls += 1;
      return {
        errcode: 0,
        access_token: tokenCalls === 1 ? 'stale' : 'fresh',
        expires_in: 7200,
      };
    }
    userCalls += 1;
    if (url.searchParams.get('access_token') === 'stale') {
      return { errcode: 42001, errmsg: 'access_token expired' };
    }
    return { errcode: 0, userid: 'u1' };
  });

  const token = await exchangeWecomCode({
    corpId: 'ww',
    corpSecret: 'sec',
    agentId: 1,
    code: 'c',
    store,
  });
  expect(token.userid).toBe('u1');
  expect(tokenCalls).toBe(2);
  expect(userCalls).toBe(2);
});

test('getWecomCorpToken / invalidate 按 agentId 隔离缓存键', async () => {
  const store = new CacheMemoryAdapter();
  let tokenCalls = 0;

  stubJsonFetch(() => {
    tokenCalls += 1;
    return {
      errcode: 0,
      access_token: `at-${tokenCalls}`,
      expires_in: 7200,
    };
  });

  const a = await getWecomCorpToken({
    corpId: 'ww',
    corpSecret: 'sec-a',
    agentId: 1,
    store,
  });
  const b = await getWecomCorpToken({
    corpId: 'ww',
    corpSecret: 'sec-b',
    agentId: 2,
    store,
  });
  expect(a).toBe('at-1');
  expect(b).toBe('at-2');
  expect(tokenCalls).toBe(2);

  // 命中各自缓存
  await expect(
    getWecomCorpToken({ corpId: 'ww', corpSecret: 'sec-a', agentId: 1, store }),
  ).resolves.toBe('at-1');
  expect(tokenCalls).toBe(2);

  await invalidateWecomCorpToken(store, 'ww', { agentId: 1 });
  await expect(
    getWecomCorpToken({ corpId: 'ww', corpSecret: 'sec-a', agentId: 1, store }),
  ).resolves.toBe('at-3');
  // agentId=2 未受影响
  await expect(
    getWecomCorpToken({ corpId: 'ww', corpSecret: 'sec-b', agentId: 2, store }),
  ).resolves.toBe('at-2');
  expect(tokenCalls).toBe(3);

  expect(corpTokenCacheKey('ww', 1)).toBe('wecom:corp_token:ww:1');
});

test('refresh / revoke 不支持', async () => {
  const client = new WecomOAuth2Client({
    corpId: 'ww',
    corpSecret: 'sec',
    agentId: 1,
    redirectUri: 'https://example.com/cb',
    store: new CacheMemoryAdapter(),
    scopes: ['snsapi_base'],
    onProfile: async ({ token }) => token.userid,
  });
  await expect(client.refresh('x')).rejects.toThrow(i18n.t('refresh_unsupported'));
  await expect(client.revoke('x')).rejects.toThrow(i18n.t('revoke_unsupported'));
});
