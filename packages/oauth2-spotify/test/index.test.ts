import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expect, test } from 'vitest';
import { SpotifyOAuth2Client, spotify } from '../src';

test('端点为绝对 URL', () => {
  expect(() => new URL(spotify.authorizationEndpoint)).not.toThrow();
  expect(() => new URL(spotify.tokenEndpoint)).not.toThrow();
});

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
