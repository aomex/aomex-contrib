import { Caching } from '@aomex/cache';
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expectType, type TypeEqual } from 'ts-expect';
import { LinkedInOAuth2Client, type LinkedInUser, type OAuth2Profile } from '../src';

const defaultClient = new LinkedInOAuth2Client({
  clientId: 'cid',
  clientSecret: 's',
  redirectUri: 'http://localhost/cb',
  store: new Caching(new CacheMemoryAdapter()),
});
declare const defaultProfile: Awaited<ReturnType<typeof defaultClient.callback>>;
expectType<TypeEqual<OAuth2Profile<LinkedInUser>, typeof defaultProfile>>(true);

new LinkedInOAuth2Client({
  clientId: 'cid',
  clientSecret: 's',
  redirectUri: 'http://localhost/cb',
  store: new Caching(new CacheMemoryAdapter()),
  onProfile(args) {
    // @ts-expect-error 纯 OAuth2 无 oidc
    args.oidc;
    const { token, userinfo } = args;
    expectType<TypeEqual<LinkedInUser, typeof userinfo>>(true);
    return { accessToken: token.access_token };
  },
});
