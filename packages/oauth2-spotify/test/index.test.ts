import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expect, test } from 'vitest';
import { SpotifyOAuth2Client } from '../src';

test('可构造', () => {
  expect(
    new SpotifyOAuth2Client({
      clientId: 'cid',
      clientSecret: 's',
      redirectUri: 'http://localhost/cb',
      store: new CacheMemoryAdapter(),
    }),
  ).toBeInstanceOf(SpotifyOAuth2Client);
});
