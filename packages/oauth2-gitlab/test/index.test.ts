import { Caching } from '@aomex/cache';
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expect, test } from 'vitest';
import { GitLabOAuth2Client } from '../src';

test('可构造', () => {
  expect(
    new GitLabOAuth2Client({
      clientId: 'cid',
      clientSecret: 's',
      redirectUri: 'http://localhost/cb',
      store: new Caching(new CacheMemoryAdapter()),
    }),
  ).toBeInstanceOf(GitLabOAuth2Client);
});
