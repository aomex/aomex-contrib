import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expect, test } from 'vitest';
import { GoogleOAuth2Client, google } from '../src';

test('预设 issuer', () => {
  expect(google.oidc.issuer).toMatch(/^https:\/\//);
});

test('可构造', () => {
  const client = new GoogleOAuth2Client({
    clientId: 'cid',
    clientSecret: 's',
    redirectUri: 'http://localhost/cb',
    store: new CacheMemoryAdapter(),
  });
  expect(client).toBeInstanceOf(GoogleOAuth2Client);
});
