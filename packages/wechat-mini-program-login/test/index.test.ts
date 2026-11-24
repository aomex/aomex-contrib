import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { internalDestroyServices } from '@aomex/common';
import { HttpError } from '@aomex/web';
import { afterEach, expect, test, vi } from 'vitest';
import { WechatMiniProgramLoginClient } from '../src';
import { i18n } from '../src/i18n';

afterEach(async () => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  await internalDestroyServices([]);
});

function createClient(store = new CacheMemoryAdapter()) {
  return new WechatMiniProgramLoginClient({
    appId: 'wx_mini',
    appSecret: 'sec',
    store,
  });
}

function stubFetch(handler: (url: URL, init?: RequestInit) => unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      const url = new URL(typeof input === 'string' ? input : String(input));
      return {
        ok: true,
        status: 200,
        json: async () => handler(url, init),
      };
    }),
  );
}

test('首次用到 store 时才登记生命周期：connect / disconnect', async () => {
  const order: string[] = [];
  class TrackingAdapter extends CacheMemoryAdapter {
    #connected = false;
    override async connect() {
      if (this.#connected) return;
      this.#connected = true;
      order.push('init');
    }
    override async disconnect() {
      order.push('destroy');
    }
  }

  const client = createClient(new TrackingAdapter());
  expect(order).toEqual([]);

  stubFetch(() => ({
    access_token: 'at',
    expires_in: 7200,
  }));
  await client.getAccessToken();
  expect(order).toEqual(['init']);
  await client.getAccessToken();
  expect(order).toEqual(['init']);

  await internalDestroyServices([]);
  expect(order).toEqual(['init', 'destroy']);
});

test('构造：空 appId / appSecret / store 抛错', () => {
  const store = new CacheMemoryAdapter();
  expect(
    () =>
      new WechatMiniProgramLoginClient({
        appId: '',
        appSecret: 'secret',
        store,
      }),
  ).toThrow(i18n.t('app_id_empty'));

  expect(
    () =>
      new WechatMiniProgramLoginClient({
        appId: 'wx',
        appSecret: '',
        store,
      }),
  ).toThrow(i18n.t('app_secret_empty'));

  expect(
    () =>
      new WechatMiniProgramLoginClient({
        appId: 'wx',
        appSecret: 'secret',
        store: undefined as never,
      }),
  ).toThrow(i18n.t('store_empty'));
});

test('code2Session', async () => {
  const client = createClient();

  await expect(client.code2Session('')).rejects.toThrow(i18n.t('js_code_empty'));

  stubFetch((url) => {
    expect(url.origin + url.pathname).toBe(
      'https://api.weixin.qq.com/sns/jscode2session',
    );
    expect(url.searchParams.get('appid')).toBe('wx_mini');
    expect(url.searchParams.get('secret')).toBe('sec');
    expect(url.searchParams.get('js_code')).toBe('js');
    expect(url.searchParams.get('grant_type')).toBe('authorization_code');
    return {
      openid: 'oid',
      session_key: 'sk',
      unionid: 'uid',
    };
  });

  await expect(client.code2Session('js')).resolves.toEqual({
    openid: 'oid',
    session_key: 'sk',
    unionid: 'uid',
  });

  stubFetch(() => ({
    openid: 'oid2',
    session_key: 'sk2',
  }));
  await expect(client.code2Session('js2')).resolves.toEqual({
    openid: 'oid2',
    session_key: 'sk2',
    unionid: undefined,
  });
});

test('code2Session：errcode → HttpError 400', async () => {
  const client = createClient();
  stubFetch(() => ({ errcode: 40029, errmsg: 'invalid code' }));
  await expect(client.code2Session('bad')).rejects.toSatisfy((err: unknown) => {
    expect(err).toBeInstanceOf(HttpError);
    expect(err).toMatchObject({
      statusCode: 400,
      message: i18n.t('code2session_failed', {
        errcode: '40029',
        errmsg: 'invalid code',
      }),
    });
    return true;
  });
});

test('code2Session：缺字段 / 无效 JSON', async () => {
  const mini = createClient();
  stubFetch(() => ({ openid: 'oid' }));
  await expect(mini.code2Session('js')).rejects.toThrow('session_key为必填项');

  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => {
        throw new Error('bad json');
      },
    })),
  );
  await expect(mini.code2Session('js')).rejects.toSatisfy((err: unknown) => {
    expect(err).toBeInstanceOf(HttpError);
    expect(err).toMatchObject({
      statusCode: 400,
      message: i18n.t('code2session_failed', {
        errcode: '200',
        errmsg: i18n.t('invalid_json'),
      }),
    });
    return true;
  });
});

test('withAccessToken：assertOk 遇 40001 清缓存后重试', async () => {
  const client = createClient();
  let tokenN = 0;
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({
      ok: true,
      status: 200,
      json: async () => {
        tokenN += 1;
        return { access_token: `at_${tokenN}`, expires_in: 7200 };
      },
    })),
  );

  let attempt = 0;
  await expect(
    client.withAccessToken(async (accessToken) => {
      attempt += 1;
      if (attempt === 1) {
        expect(accessToken).toBe('at_1');
        client.assertOk({ errcode: 40001, errmsg: 'invalid credential' });
      }
      expect(accessToken).toBe('at_2');
      return 'ok';
    }),
  ).resolves.toBe('ok');
  expect(attempt).toBe(2);
  expect(tokenN).toBe(2);
});

test('getAccessToken：拉取并缓存', async () => {
  const client = createClient();
  const fetchMock = vi.fn(async (input: string | URL) => {
    const url = new URL(String(input));
    expect(url.origin + url.pathname).toBe('https://api.weixin.qq.com/cgi-bin/token');
    expect(url.searchParams.get('grant_type')).toBe('client_credential');
    expect(url.searchParams.get('appid')).toBe('wx_mini');
    expect(url.searchParams.get('secret')).toBe('sec');
    return {
      ok: true,
      status: 200,
      json: async () => ({
        access_token: 'at_1',
        expires_in: 7200,
      }),
    };
  });
  vi.stubGlobal('fetch', fetchMock);

  await expect(client.getAccessToken()).resolves.toBe('at_1');
  await expect(client.getAccessToken()).resolves.toBe('at_1');
  expect(fetchMock).toHaveBeenCalledTimes(1);

  await client.deleteAccessToken();
  fetchMock.mockClear();
  fetchMock.mockImplementation(async () => ({
    ok: true,
    status: 200,
    json: async () => ({ access_token: 'at_2', expires_in: 7200 }),
  }));
  await expect(client.getAccessToken()).resolves.toBe('at_2');
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

test('getAccessToken：并发只向微信换一次票', async () => {
  const client = createClient();
  let resolveFetch!: (value: unknown) => void;
  const fetchGate = new Promise((resolve) => {
    resolveFetch = resolve;
  });
  const fetchMock = vi.fn(async () => {
    await fetchGate;
    return {
      ok: true,
      status: 200,
      json: async () => ({ access_token: 'at_sf', expires_in: 7200 }),
    };
  });
  vi.stubGlobal('fetch', fetchMock);

  const pending = Promise.all([
    client.getAccessToken(),
    client.getAccessToken(),
    client.getAccessToken(),
  ]);
  await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
  resolveFetch(undefined);
  await expect(pending).resolves.toEqual(['at_sf', 'at_sf', 'at_sf']);
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

test('getPhoneNumber', async () => {
  const client = createClient();
  await expect(client.getPhoneNumber('')).rejects.toThrow(i18n.t('phone_code_empty'));

  stubFetch((url, init) => {
    if (url.pathname === '/cgi-bin/token') {
      return { access_token: 'at_phone', expires_in: 7200 };
    }
    expect(url.origin + url.pathname).toBe(
      'https://api.weixin.qq.com/wxa/business/getuserphonenumber',
    );
    expect(url.searchParams.get('access_token')).toBe('at_phone');
    expect(init?.method).toBe('POST');
    const body = JSON.parse(String(init?.body));
    expect(body).toEqual({ code: 'phone_code', openid: 'oid' });
    return {
      errcode: 0,
      errmsg: 'ok',
      phone_info: {
        phoneNumber: '8613800138000',
        purePhoneNumber: '13800138000',
        countryCode: '86',
        watermark: { timestamp: 1, appid: 'wx_mini' },
      },
    };
  });

  await expect(client.getPhoneNumber('phone_code', { openid: 'oid' })).resolves.toEqual({
    phoneNumber: '8613800138000',
    purePhoneNumber: '13800138000',
    countryCode: '86',
    watermark: { timestamp: 1, appid: 'wx_mini' },
  });
});

test('getPhoneNumber：access_token 失效时清缓存重试', async () => {
  const client = createClient();
  let tokenCalls = 0;

  stubFetch((url) => {
    if (url.pathname === '/cgi-bin/token') {
      tokenCalls += 1;
      return {
        access_token: tokenCalls === 1 ? 'stale' : 'fresh',
        expires_in: 7200,
      };
    }
    if (url.searchParams.get('access_token') === 'stale') {
      return { errcode: 42001, errmsg: 'access_token expired' };
    }
    return {
      errcode: 0,
      phone_info: {
        phoneNumber: '8613900139000',
        purePhoneNumber: '13900139000',
        countryCode: '86',
        watermark: { timestamp: 2, appid: 'wx_mini' },
      },
    };
  });

  await expect(client.getPhoneNumber('phone_code')).resolves.toEqual({
    phoneNumber: '8613900139000',
    purePhoneNumber: '13900139000',
    countryCode: '86',
    watermark: { timestamp: 2, appid: 'wx_mini' },
  });
  expect(tokenCalls).toBe(2);
});
