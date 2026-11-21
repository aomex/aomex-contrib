import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expect, test } from 'vitest';
import { FacebookOAuth2Client, facebook } from '../src';

test('端点为绝对 URL', () => {
  expect(() => new URL(facebook.authorizationEndpoint)).not.toThrow();
  expect(() => new URL(facebook.tokenEndpoint)).not.toThrow();
});

test('可构造', () => {
  expect(
    new FacebookOAuth2Client({
      clientId: 'cid',
      clientSecret: 's',
      redirectUri: 'http://localhost/cb',
      store: new CacheMemoryAdapter(),
    }),
  ).toBeInstanceOf(FacebookOAuth2Client);
});
