import { Caching } from '@aomex/cache';
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expectType, type TypeEqual } from 'ts-expect';
import {
  AppleOAuth2Client,
  type AppleFormUser,
  type AppleIdTokenClaims,
  type AppleProfile,
} from '../src';

declare const pem: string;

const defaultClient = new AppleOAuth2Client({
  clientId: 'com.example.app',
  teamId: 'TEAM',
  keyId: 'kid',
  privateKey: pem,
  redirectUri: 'https://example.com/cb',
  store: new Caching(new CacheMemoryAdapter()),
});
declare const defaultProfile: Awaited<ReturnType<typeof defaultClient.callback>>;
expectType<TypeEqual<AppleProfile, typeof defaultProfile>>(true);
expectType<TypeEqual<AppleIdTokenClaims, typeof defaultProfile.claims>>(true);
expectType<TypeEqual<AppleFormUser | null, typeof defaultProfile.user>>(true);

new AppleOAuth2Client({
  clientId: 'com.example.app',
  teamId: 'TEAM',
  keyId: 'kid',
  privateKey: pem,
  redirectUri: 'https://example.com/cb',
  store: new Caching(new CacheMemoryAdapter()),
  onProfile({ oidc, user }) {
    expectType<TypeEqual<AppleIdTokenClaims, typeof oidc.claims>>(true);
    expectType<
      TypeEqual<
        boolean | 'true' | 'false' | undefined,
        typeof oidc.claims.is_private_email
      >
    >(true);
    expectType<TypeEqual<AppleFormUser | null, typeof user>>(true);
    return { sub: oidc.claims.sub, name: user?.name };
  },
});

new AppleOAuth2Client({
  clientId: 'com.example.app',
  teamId: 'TEAM',
  keyId: 'kid',
  privateKey: pem,
  redirectUri: 'https://example.com/cb',
  store: new Caching(new CacheMemoryAdapter()),
  // @ts-expect-error Apple 不使用静态 clientSecret
  clientSecret: 'static',
  onProfile: async () => ({}),
});
