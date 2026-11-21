import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expect, test } from 'vitest';
import { GitLabOAuth2Client, gitlab } from '../src';

test('端点为绝对 URL', () => {
  expect(() => new URL(gitlab.authorizationEndpoint)).not.toThrow();
  expect(() => new URL(gitlab.tokenEndpoint)).not.toThrow();
});

test('可构造', () => {
  expect(
    new GitLabOAuth2Client({
      clientId: 'cid',
      clientSecret: 's',
      redirectUri: 'http://localhost/cb',
      store: new CacheMemoryAdapter(),
    }),
  ).toBeInstanceOf(GitLabOAuth2Client);
});
