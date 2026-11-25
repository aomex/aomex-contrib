import { Caching } from '@aomex/cache';
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expect, test } from 'vitest';
import { GoogleOAuth2Client } from '../src';

test('可构造', () => {
  const client = new GoogleOAuth2Client({
    clientId: 'cid',
    clientSecret: 's',
    redirectUri: 'http://localhost/cb',
    store: new Caching(new CacheMemoryAdapter()),
  });
  expect(client).toBeInstanceOf(GoogleOAuth2Client);
});
