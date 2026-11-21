import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expect, test } from 'vitest';
import { GitHubOAuth2Client, github } from '../src';

test('端点为绝对 URL', () => {
  expect(() => new URL(github.authorizationEndpoint)).not.toThrow();
  expect(() => new URL(github.tokenEndpoint)).not.toThrow();
});

test('可构造', () => {
  expect(
    new GitHubOAuth2Client({
      clientId: 'cid',
      clientSecret: 's',
      redirectUri: 'http://localhost/cb',
      store: new CacheMemoryAdapter(),
    }),
  ).toBeInstanceOf(GitHubOAuth2Client);
});
