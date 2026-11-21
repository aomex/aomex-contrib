import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expect, test } from 'vitest';
import { DiscordOAuth2Client, discord } from '../src';

test('端点为绝对 URL', () => {
  expect(() => new URL(discord.authorizationEndpoint)).not.toThrow();
  expect(() => new URL(discord.tokenEndpoint)).not.toThrow();
});

test('可构造', () => {
  expect(
    new DiscordOAuth2Client({
      clientId: 'cid',
      clientSecret: 's',
      redirectUri: 'http://localhost/cb',
      store: new CacheMemoryAdapter(),
    }),
  ).toBeInstanceOf(DiscordOAuth2Client);
});
