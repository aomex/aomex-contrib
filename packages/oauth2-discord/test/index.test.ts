import { Caching } from '@aomex/cache';
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expect, test } from 'vitest';
import { DiscordOAuth2Client } from '../src';

test('可构造', () => {
  expect(
    new DiscordOAuth2Client({
      clientId: 'cid',
      clientSecret: 's',
      redirectUri: 'http://localhost/cb',
      store: new Caching(new CacheMemoryAdapter()),
    }),
  ).toBeInstanceOf(DiscordOAuth2Client);
});
