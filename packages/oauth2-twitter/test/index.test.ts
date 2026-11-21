import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expect, test } from 'vitest';
import { TwitterOAuth2Client, twitter } from '../src';

test('端点为绝对 URL', () => {
  expect(() => new URL(twitter.authorizationEndpoint)).not.toThrow();
  expect(() => new URL(twitter.tokenEndpoint)).not.toThrow();
});

test('可构造', () => {
  expect(
    new TwitterOAuth2Client({
      clientId: 'cid',
      clientSecret: 's',
      redirectUri: 'http://localhost/cb',
      store: new CacheMemoryAdapter(),
    }),
  ).toBeInstanceOf(TwitterOAuth2Client);
});
