import { afterEach, expect, test, vi } from 'vitest';
import { WechatMiniProgramLoginClient } from '../src';
import { i18n } from '../src/i18n';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

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
  expect(
    () =>
      new WechatMiniProgramLoginClient({
        appId: '',
        appSecret: 'secret',
      }),
  ).toThrow(i18n.t('app_id_empty'));

  expect(
    () =>
      new WechatMiniProgramLoginClient({
        appId: 'wx',
        appSecret: '',
      }),
  ).toThrow(i18n.t('app_secret_empty'));
});

test('code2Session', async () => {
  const client = new WechatMiniProgramLoginClient({
    appId: 'wx_mini',
    appSecret: 'sec',
  });

  await expect(client.code2Session('')).rejects.toThrow(i18n.t('js_code_empty'));

  stubJsonFetch((url) => {
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

  stubJsonFetch(() => ({
    openid: 'oid2',
    session_key: 'sk2',
  }));
  await expect(client.code2Session('js2')).resolves.toEqual({
    openid: 'oid2',
    session_key: 'sk2',
    unionid: undefined,
  });
});

test('code2Session：errcode', async () => {
  const client = new WechatMiniProgramLoginClient({
    appId: 'wx_mini',
    appSecret: 'sec',
  });
  stubJsonFetch(() => ({ errcode: 40029, errmsg: 'invalid code' }));
  await expect(client.code2Session('bad')).rejects.toThrow(
    i18n.t('code2session_failed', {
      errcode: '40029',
      errmsg: 'invalid code',
    }),
  );
});

test('code2Session：缺字段 / 无效 JSON', async () => {
  const mini = new WechatMiniProgramLoginClient({
    appId: 'wx_mini',
    appSecret: 'sec',
  });
  stubJsonFetch(() => ({ openid: 'oid' }));
  await expect(mini.code2Session('js')).rejects.toThrow(
    i18n.t('code2session_failed', {
      errcode: '?',
      errmsg: 'missing fields',
    }),
  );

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
  await expect(mini.code2Session('js')).rejects.toThrow(
    i18n.t('code2session_failed', {
      errcode: '200',
      errmsg: 'invalid json',
    }),
  );
});
