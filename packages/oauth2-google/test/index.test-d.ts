import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expectType, type TypeEqual } from 'ts-expect';
import { GoogleOAuth2Client, type GoogleIdTokenClaims } from '../src';

new GoogleOAuth2Client({
  clientId: 'cid',
  clientSecret: 's',
  redirectUri: 'http://localhost/cb',
  store: new CacheMemoryAdapter(),
});

new GoogleOAuth2Client({
  clientId: 'cid',
  clientSecret: 's',
  redirectUri: 'http://localhost/cb',
  store: new CacheMemoryAdapter(),
  onProfile({ oidc }) {
    expectType<TypeEqual<GoogleIdTokenClaims, typeof oidc.claims>>(true);
    return { sub: oidc.claims.sub };
  },
});
