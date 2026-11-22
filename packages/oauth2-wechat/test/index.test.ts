import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { afterEach, expect, test, vi } from 'vitest';
import {
  WECHAT_MP_AUTHORIZE,
  WECHAT_OPEN_AUTHORIZE,
  WECHAT_REFRESH_URL,
  WECHAT_TOKEN_URL,
  WechatMpOAuth2Client,
  WechatOpenOAuth2Client,
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

test('构造：空 appId / appSecret 抛错', () => {
  const store = new CacheMemoryAdapter();
  const base = {
    redirectUri: 'https://example.com/cb',
    store,
    onProfile: async () => ({}),
  };

  expect(
    () =>
      new WechatOpenOAuth2Client({
        ...base,
        scopes: ['snsapi_login'],
        appId: '',
        appSecret: 'secret',
      }),
  ).toThrow(i18n.t('app_id_empty'));

  expect(
    () =>
      new WechatMpOAuth2Client({
        ...base,
        scopes: ['snsapi_userinfo'],
        appId: 'wx',
        appSecret: '',
      }),
  ).toThrow(i18n.t('app_secret_empty'));
});

test('开放平台：授权 URL 用 appid、snsapi_login、#wechat_redirect', async () => {
  const store = new CacheMemoryAdapter();
  const client = new WechatOpenOAuth2Client({
    scopes: ['snsapi_login'],
    appId: 'wx_open',
    appSecret: 'secret',
    redirectUri: 'https://example.com/cb',
    store,
    onProfile: async ({ token }) => token.openid,
  });

  const raw = await client.getAuthorizationUrl(mockCtx());
  expect(raw.endsWith('#wechat_redirect')).toBe(true);
  const url = new URL(raw.replace(/#wechat_redirect$/, ''));
  expect(url.origin + url.pathname).toBe(WECHAT_OPEN_AUTHORIZE);
  expect(url.searchParams.get('appid')).toBe('wx_open');
  expect(url.searchParams.get('client_id')).toBeNull();
  expect(url.searchParams.get('redirect_uri')).toBe('https://example.com/cb');
  expect(url.searchParams.get('response_type')).toBe('code');
  expect(url.searchParams.get('scope')).toBe('snsapi_login');
  expect(url.searchParams.get('code_challenge')).toBeNull();
  expect(url.searchParams.get('state')).toMatch(/^[A-Za-z0-9_-]+$/);
  // 官方示例顺序：appid → redirect_uri → response_type → scope → state
  expect([...url.searchParams.keys()]).toEqual([
    'appid',
    'redirect_uri',
    'response_type',
    'scope',
    'state',
  ]);
});

test('公众号：scopes 控制 snsapi_userinfo / snsapi_base', async () => {
  const store = new CacheMemoryAdapter();
  const userinfo = new WechatMpOAuth2Client({
    scopes: ['snsapi_userinfo'],
    appId: 'wx_mp',
    appSecret: 'secret',
    redirectUri: 'https://example.com/cb',
    store,
    onProfile: async ({ token }) => token.openid,
  });
  const base = new WechatMpOAuth2Client({
    appId: 'wx_mp',
    appSecret: 'secret',
    redirectUri: 'https://example.com/cb',
    store,
    scopes: ['snsapi_base'],
    onProfile: async ({ token }) => token.openid,
  });

  const u1 = new URL(
    (await userinfo.getAuthorizationUrl(mockCtx())).replace(/#wechat_redirect$/, ''),
  );
  expect(u1.origin + u1.pathname).toBe(WECHAT_MP_AUTHORIZE);
  expect(u1.searchParams.get('scope')).toBe('snsapi_userinfo');

  const u2 = new URL(
    (await base.getAuthorizationUrl(mockCtx())).replace(/#wechat_redirect$/, ''),
  );
  expect(u2.searchParams.get('scope')).toBe('snsapi_base');
});

test('callback：默认自动拉 /sns/userinfo', async () => {
  const store = new CacheMemoryAdapter();
  const client = new WechatOpenOAuth2Client({
    scopes: ['snsapi_login'],
    appId: 'wx_open',
    appSecret: 'sec',
    redirectUri: 'https://example.com/cb',
    store,
  });

  const raw = await client.getAuthorizationUrl(mockCtx());
  const state = new URL(raw.replace(/#wechat_redirect$/, '')).searchParams.get('state')!;

  stubJsonFetch((url) => {
    const path = url.origin + url.pathname;
    if (path === WECHAT_TOKEN_URL) {
      return {
        access_token: 'at',
        token_type: 'bearer',
        expires_in: 7200,
        refresh_token: 'rt',
        openid: 'oid',
        scope: 'snsapi_login',
        unionid: 'uid',
      };
    }
    if (path === 'https://api.weixin.qq.com/sns/userinfo') {
      expect(url.searchParams.get('access_token')).toBe('at');
      expect(url.searchParams.get('openid')).toBe('oid');
      return {
        openid: 'oid',
        nickname: '昵称',
        sex: 1,
        province: 'GD',
        city: 'SZ',
        country: 'CN',
        headimgurl: 'https://example.com/a.png',
        privilege: [],
        unionid: 'uid',
      };
    }
    throw new Error(`unexpected ${path}`);
  });

  await expect(client.callback(mockCtx({ code: 'wx-code', state }))).resolves.toEqual({
    base: {
      access_token: 'at',
      token_type: 'bearer',
      expires_in: 7200,
      refresh_token: 'rt',
      scope: 'snsapi_login',
      openid: 'oid',
      unionid: 'uid',
      is_snapshotuser: undefined,
    },
    userinfo: {
      openid: 'oid',
      nickname: '昵称',
      sex: 1,
      province: 'GD',
      city: 'SZ',
      country: 'CN',
      headimgurl: 'https://example.com/a.png',
      privilege: [],
      unionid: 'uid',
    },
  });
});

test('callback：snsapi_base 不拉 userinfo，返回令牌', async () => {
  const store = new CacheMemoryAdapter();
  const client = new WechatMpOAuth2Client({
    appId: 'wx_mp',
    appSecret: 'sec',
    redirectUri: 'https://example.com/cb',
    store,
    scopes: ['snsapi_base'],
  });

  const raw = await client.getAuthorizationUrl(mockCtx());
  const state = new URL(raw.replace(/#wechat_redirect$/, '')).searchParams.get('state')!;

  stubJsonFetch((url) => {
    expect(url.origin + url.pathname).toBe(WECHAT_TOKEN_URL);
    return {
      access_token: 'at',
      token_type: 'bearer',
      openid: 'oid',
      scope: 'snsapi_base',
    };
  });

  await expect(client.callback(mockCtx({ code: 'c', state }))).resolves.toEqual({
    base: {
      access_token: 'at',
      token_type: 'bearer',
      expires_in: undefined,
      refresh_token: undefined,
      scope: 'snsapi_base',
      openid: 'oid',
      unionid: undefined,
      is_snapshotuser: undefined,
    },
    userinfo: null,
  });
});

test('callback：换票省略 scope 时仍按配置 scopes 拉 userinfo', async () => {
  const store = new CacheMemoryAdapter();
  const client = new WechatMpOAuth2Client({
    scopes: ['snsapi_userinfo'],
    appId: 'wx_mp',
    appSecret: 'sec',
    redirectUri: 'https://example.com/cb',
    store,
  });

  const raw = await client.getAuthorizationUrl(mockCtx());
  const state = new URL(raw.replace(/#wechat_redirect$/, '')).searchParams.get('state')!;

  stubJsonFetch((url) => {
    const path = url.origin + url.pathname;
    if (path === WECHAT_TOKEN_URL) {
      return {
        access_token: 'at',
        token_type: 'bearer',
        openid: 'oid',
        // 故意不返回 scope
      };
    }
    if (path === 'https://api.weixin.qq.com/sns/userinfo') {
      return {
        openid: 'oid',
        nickname: '昵称',
        sex: 0,
        province: '',
        city: '',
        country: '',
        headimgurl: '',
        privilege: [],
      };
    }
    throw new Error(`unexpected ${path}`);
  });

  await expect(client.callback(mockCtx({ code: 'c', state }))).resolves.toMatchObject({
    base: { access_token: 'at', openid: 'oid' },
    userinfo: { openid: 'oid', nickname: '昵称' },
  });
});

test('换票失败：errcode 非 0', async () => {
  const store = new CacheMemoryAdapter();
  const client = new WechatMpOAuth2Client({
    scopes: ['snsapi_userinfo'],
    appId: 'wx_mp',
    appSecret: 'sec',
    redirectUri: 'https://example.com/cb',
    store,
    onProfile: async ({ token }) => token.openid,
  });
  const raw = await client.getAuthorizationUrl(mockCtx());
  const state = new URL(raw.replace(/#wechat_redirect$/, '')).searchParams.get('state')!;

  stubJsonFetch(() => ({
    errcode: 40029,
    errmsg: 'invalid code',
  }));

  await expect(client.callback(mockCtx({ code: 'bad', state }))).rejects.toThrow(
    i18n.t('token_failed', { errcode: '40029', errmsg: 'invalid code' }),
  );
});

test('refresh：GET refresh_token', async () => {
  const client = new WechatOpenOAuth2Client({
    appId: 'wx_open',
    appSecret: 'sec',
    redirectUri: 'https://example.com/cb',
    store: new CacheMemoryAdapter(),
    scopes: ['snsapi_login'],
    onProfile: async ({ token }) => token.openid,
  });

  stubJsonFetch((url) => {
    expect(url.origin + url.pathname).toBe(WECHAT_REFRESH_URL);
    expect(url.searchParams.get('appid')).toBe('wx_open');
    expect(url.searchParams.get('refresh_token')).toBe('rt');
    expect(url.searchParams.get('grant_type')).toBe('refresh_token');
    return {
      access_token: 'at2',
      token_type: 'bearer',
      expires_in: 7200,
      refresh_token: 'rt2',
      openid: 'oid',
      scope: 'snsapi_login',
    };
  });

  const token = await client.refresh('rt');
  expect(token).toEqual({
    access_token: 'at2',
    token_type: 'bearer',
    expires_in: 7200,
    refresh_token: 'rt2',
    scope: 'snsapi_login',
    openid: 'oid',
    unionid: undefined,
    is_snapshotuser: undefined,
  });
});

test('换票解析 is_snapshotuser（公众号快照页）', async () => {
  const store = new CacheMemoryAdapter();
  const client = new WechatMpOAuth2Client({
    scopes: ['snsapi_userinfo'],
    appId: 'wx_mp',
    appSecret: 'sec',
    redirectUri: 'https://example.com/cb',
    store,
    onProfile: async ({ token }) => token,
  });
  const raw = await client.getAuthorizationUrl(mockCtx());
  const state = new URL(raw.replace(/#wechat_redirect$/, '')).searchParams.get('state')!;

  stubJsonFetch(() => ({
    access_token: 'at',
    token_type: 'bearer',
    expires_in: 7200,
    refresh_token: 'rt',
    openid: 'oid',
    scope: 'snsapi_userinfo',
    is_snapshotuser: 1,
    unionid: 'uid',
  }));

  await expect(client.callback(mockCtx({ code: 'c', state }))).resolves.toEqual({
    access_token: 'at',
    token_type: 'bearer',
    expires_in: 7200,
    refresh_token: 'rt',
    scope: 'snsapi_userinfo',
    openid: 'oid',
    unionid: 'uid',
    is_snapshotuser: 1,
  });
});

test('refresh：空 token / revoke 不支持', async () => {
  const client = new WechatOpenOAuth2Client({
    appId: 'wx_open',
    appSecret: 'sec',
    redirectUri: 'https://example.com/cb',
    store: new CacheMemoryAdapter(),
    scopes: ['snsapi_login'],
    onProfile: async ({ token }) => token.openid,
  });

  await expect(client.refresh('')).rejects.toThrow(i18n.t('refresh_token_empty'));
  await expect(client.revoke('any')).rejects.toThrow(i18n.t('revoke_unsupported'));
});

test('换票缺 access_token/openid', async () => {
  const store = new CacheMemoryAdapter();
  const client = new WechatOpenOAuth2Client({
    scopes: ['snsapi_login'],
    appId: 'wx_open',
    appSecret: 'sec',
    redirectUri: 'https://example.com/cb',
    store,
    onProfile: async ({ token }) => token.openid,
  });
  const raw = await client.getAuthorizationUrl(mockCtx());
  const state = new URL(raw.replace(/#wechat_redirect$/, '')).searchParams.get('state')!;

  stubJsonFetch(() => ({ access_token: 'at' }));
  await expect(client.callback(mockCtx({ code: 'c', state }))).rejects.toThrow(
    /missing access_token\/openid/,
  );
});

test('authorizationParams 可附加在 state 后；忽略覆盖必填字段', async () => {
  const client = new WechatMpOAuth2Client({
    appId: 'wx_mp',
    appSecret: 'sec',
    redirectUri: 'https://example.com/cb',
    store: new CacheMemoryAdapter(),
    scopes: ['snsapi_userinfo'],
    authorizationParams: {
      forcePopup: 'true',
      appid: 'should-be-ignored',
      state: 'should-be-ignored',
    },
    onProfile: async ({ token }) => token.openid,
  });
  const raw = await client.getAuthorizationUrl(mockCtx());
  const url = new URL(raw.replace(/#wechat_redirect$/, ''));
  expect(url.searchParams.get('forcePopup')).toBe('true');
  expect(url.searchParams.get('appid')).toBe('wx_mp');
  expect(url.searchParams.get('state')).toMatch(/^[A-Za-z0-9_-]+$/);
  expect(url.searchParams.get('state')).not.toBe('should-be-ignored');
  expect([...url.searchParams.keys()]).toEqual([
    'appid',
    'redirect_uri',
    'response_type',
    'scope',
    'state',
    'forcePopup',
  ]);
});

test('scopes 为空数组时不带 scope；redirectUri 可为函数', async () => {
  const client = new WechatOpenOAuth2Client({
    appId: 'wx_open',
    appSecret: 'sec',
    redirectUri: () => 'https://example.com/dyn',
    store: new CacheMemoryAdapter(),
    scopes: [],
    onProfile: async ({ token }) => token.openid,
  });
  const raw = await client.getAuthorizationUrl(mockCtx());
  const url = new URL(raw.replace(/#wechat_redirect$/, ''));
  expect(url.searchParams.get('scope')).toBeNull();
  expect(url.searchParams.get('redirect_uri')).toBe('https://example.com/dyn');
});

test('换票仅必填字段；errcode=0；errcode 无 errmsg', async () => {
  const store = new CacheMemoryAdapter();
  const client = new WechatOpenOAuth2Client({
    scopes: ['snsapi_login'],
    appId: 'wx_open',
    appSecret: 'sec',
    redirectUri: 'https://example.com/cb',
    store,
    onProfile: async ({ token }) => token,
  });
  const raw = await client.getAuthorizationUrl(mockCtx());
  const state = new URL(raw.replace(/#wechat_redirect$/, '')).searchParams.get('state')!;

  stubJsonFetch(() => ({
    errcode: 0,
    access_token: 'at',
    token_type: 'bearer',
    openid: 'oid',
  }));
  await expect(client.callback(mockCtx({ code: 'c', state }))).resolves.toEqual({
    access_token: 'at',
    token_type: 'bearer',
    expires_in: undefined,
    refresh_token: undefined,
    scope: undefined,
    openid: 'oid',
    unionid: undefined,
    is_snapshotuser: undefined,
  });

  stubJsonFetch(() => ({ errcode: 40163 }));
  await expect(client.refresh('rt')).rejects.toThrow(
    i18n.t('refresh_failed', { errcode: '40163', errmsg: '' }),
  );
});

test('refresh 失败 errcode', async () => {
  const open = new WechatOpenOAuth2Client({
    appId: 'wx_open',
    appSecret: 'sec',
    redirectUri: 'https://example.com/cb',
    store: new CacheMemoryAdapter(),
    scopes: ['snsapi_login'],
    onProfile: async ({ token }) => token.openid,
  });

  stubJsonFetch(() => ({ errcode: 40030, errmsg: 'invalid refresh_token' }));
  await expect(open.refresh('rt')).rejects.toThrow(
    i18n.t('refresh_failed', {
      errcode: '40030',
      errmsg: 'invalid refresh_token',
    }),
  );
});

test('withAccessToken：assertOk 遇 40001 清缓存后重试', async () => {
  const mp = new WechatMpOAuth2Client({
    appId: 'wx_mp',
    appSecret: 'sec',
    redirectUri: 'https://example.com/cb',
    store: new CacheMemoryAdapter(),
    scopes: ['snsapi_base'],
  });

  let tokenN = 0;
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => {
        tokenN += 1;
        return { access_token: `mp_at_${tokenN}`, expires_in: 7200 };
      },
    })),
  );

  let attempt = 0;
  const result = await mp.withAccessToken(async (accessToken) => {
    attempt += 1;
    if (attempt === 1) {
      expect(accessToken).toBe('mp_at_1');
      mp.assertOk({ errcode: 40001, errmsg: 'invalid credential' });
    }
    expect(accessToken).toBe('mp_at_2');
    return 'ok';
  });
  expect(result).toBe('ok');
  expect(attempt).toBe(2);
  expect(tokenN).toBe(2);
});

test('getAccessToken：拉取并缓存；delete 后重取', async () => {
  const mp = new WechatMpOAuth2Client({
    appId: 'wx_mp',
    appSecret: 'sec',
    redirectUri: 'https://example.com/cb',
    store: new CacheMemoryAdapter(),
    scopes: ['snsapi_base'],
  });

  const fetchMock = vi.fn(async (input: string | URL) => {
    const url = new URL(String(input));
    expect(url.origin + url.pathname).toBe('https://api.weixin.qq.com/cgi-bin/token');
    expect(url.searchParams.get('grant_type')).toBe('client_credential');
    expect(url.searchParams.get('appid')).toBe('wx_mp');
    expect(url.searchParams.get('secret')).toBe('sec');
    return {
      ok: true,
      status: 200,
      json: async () => ({ access_token: 'mp_at_1', expires_in: 7200 }),
    };
  });
  vi.stubGlobal('fetch', fetchMock);

  await expect(mp.getAccessToken()).resolves.toBe('mp_at_1');
  await expect(mp.getAccessToken()).resolves.toBe('mp_at_1');
  expect(fetchMock).toHaveBeenCalledTimes(1);

  await mp.deleteAccessToken();
  fetchMock.mockClear();
  fetchMock.mockImplementation(async () => ({
    ok: true,
    status: 200,
    json: async () => ({ access_token: 'mp_at_2', expires_in: 7200 }),
  }));
  await expect(mp.getAccessToken()).resolves.toBe('mp_at_2');
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

test('getAccessToken：并发只向微信换一次票', async () => {
  const mp = new WechatMpOAuth2Client({
    appId: 'wx_mp',
    appSecret: 'sec',
    redirectUri: 'https://example.com/cb',
    store: new CacheMemoryAdapter(),
    scopes: ['snsapi_base'],
  });

  let resolveFetch!: (value: unknown) => void;
  const fetchGate = new Promise((resolve) => {
    resolveFetch = resolve;
  });
  const fetchMock = vi.fn(async () => {
    await fetchGate;
    return {
      ok: true,
      status: 200,
      json: async () => ({ access_token: 'mp_sf', expires_in: 7200 }),
    };
  });
  vi.stubGlobal('fetch', fetchMock);

  const pending = Promise.all([
    mp.getAccessToken(),
    mp.getAccessToken(),
    mp.getAccessToken(),
  ]);
  await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
  resolveFetch(undefined);
  await expect(pending).resolves.toEqual(['mp_sf', 'mp_sf', 'mp_sf']);
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

test('getAccessToken：errcode 抛错', async () => {
  const mp = new WechatMpOAuth2Client({
    appId: 'wx_mp',
    appSecret: 'sec',
    redirectUri: 'https://example.com/cb',
    store: new CacheMemoryAdapter(),
    scopes: ['snsapi_base'],
  });

  stubJsonFetch(() => ({ errcode: 40013, errmsg: 'invalid appid' }));
  await expect(mp.getAccessToken()).rejects.toThrow(
    i18n.t('access_token_failed', {
      errcode: '40013',
      errmsg: 'invalid appid',
    }),
  );
});
