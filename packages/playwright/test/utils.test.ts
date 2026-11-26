import { expect, test } from 'vitest';
import {
  chromeUserAgentFromVersion,
  mergeProxy,
  sanitizeUserDataDirName,
  toPlaywrightProxy,
} from '../src/utils';

test('sanitizeUserDataDirName 净化非法字符与空值', () => {
  expect(sanitizeUserDataDirName(undefined)).toBe('default');
  expect(sanitizeUserDataDirName('')).toBe('default');
  expect(sanitizeUserDataDirName('..')).toBe('default');
  expect(sanitizeUserDataDirName('a/b:c*')).toBe('a_b_c_');
  expect(sanitizeUserDataDirName('login-1 ')).toBe('login-1');
});

test('toPlaywrightProxy 支持 server 或 host+port，并合并鉴权', () => {
  expect(toPlaywrightProxy(undefined)).toBeUndefined();
  expect(toPlaywrightProxy({ server: ' http://1.1.1.1:9 ' })).toEqual({
    server: 'http://1.1.1.1:9',
  });
  expect(toPlaywrightProxy({ host: '2.2.2.2', port: 8080 })).toEqual({
    server: 'http://2.2.2.2:8080',
  });
  expect(toPlaywrightProxy({ host: '2.2.2.2' })).toBeUndefined();

  const merged = mergeProxy(
    { host: '1.1.1.1', port: 80 },
    { username: 'u', password: 'p' },
  );
  expect(toPlaywrightProxy(merged)).toEqual({
    server: 'http://1.1.1.1:80',
    username: 'u',
    password: 'p',
  });

  expect(
    toPlaywrightProxy({
      server: 'socks5://h:1080',
      username: 'a',
      password: 'b',
    }),
  ).toEqual({
    server: 'socks5://h:1080',
    username: 'a',
    password: 'b',
  });
});

test('chromeUserAgentFromVersion', () => {
  expect(chromeUserAgentFromVersion('129.0.6668.29')).toContain('Chrome/129.0.6668.29');
  expect(chromeUserAgentFromVersion('Chrome/130.0.0.0')).toContain('Chrome/130.0.0.0');
});
