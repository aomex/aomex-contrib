import { Caching } from '@aomex/cache';
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expectType, type TypeEqual } from 'ts-expect';
import { MicrosoftOAuth2Client, type MicrosoftIdTokenClaims } from '../src';

new MicrosoftOAuth2Client({
  clientId: 'cid',
  clientSecret: 's',
  redirectUri: 'http://localhost/cb',
  store: new Caching(new CacheMemoryAdapter()),
});

new MicrosoftOAuth2Client({
  clientId: 'cid',
  clientSecret: 's',
  redirectUri: 'http://localhost/cb',
  store: new Caching(new CacheMemoryAdapter()),
  onProfile({ oidc }) {
    expectType<TypeEqual<MicrosoftIdTokenClaims, typeof oidc.claims>>(true);
    return { sub: oidc.claims.sub };
  },
});
