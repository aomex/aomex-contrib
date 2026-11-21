import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expect, test } from 'vitest';
import { MicrosoftOAuth2Client, microsoft } from '../src';

test('预设 issuer', () => {
  expect(microsoft.oidc.issuer).toMatch(/^https:\/\//);
});

test('可构造', () => {
  const client = new MicrosoftOAuth2Client({
    clientId: 'cid',
    clientSecret: 's',
    redirectUri: 'http://localhost/cb',
    store: new CacheMemoryAdapter(),
  });
  expect(client).toBeInstanceOf(MicrosoftOAuth2Client);
});
