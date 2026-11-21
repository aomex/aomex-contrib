import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expect, test } from 'vitest';
import { LinkedInOAuth2Client, linkedin } from '../src';

test('端点为绝对 URL', () => {
  expect(() => new URL(linkedin.authorizationEndpoint)).not.toThrow();
  expect(() => new URL(linkedin.tokenEndpoint)).not.toThrow();
});

test('可构造', () => {
  expect(
    new LinkedInOAuth2Client({
      clientId: 'cid',
      clientSecret: 's',
      redirectUri: 'http://localhost/cb',
      store: new CacheMemoryAdapter(),
    }),
  ).toBeInstanceOf(LinkedInOAuth2Client);
});
