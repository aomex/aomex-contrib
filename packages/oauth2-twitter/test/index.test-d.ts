import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expectType, type TypeEqual } from 'ts-expect';
import { TwitterOAuth2Client, type TwitterUser, type OAuth2Profile } from '../src';

const defaultClient = new TwitterOAuth2Client({
  clientId: 'cid',
  clientSecret: 's',
  redirectUri: 'http://localhost/cb',
  store: new CacheMemoryAdapter(),
});
declare const defaultProfile: Awaited<ReturnType<typeof defaultClient.callback>>;
expectType<TypeEqual<OAuth2Profile<TwitterUser>, typeof defaultProfile>>(true);

new TwitterOAuth2Client({
  clientId: 'cid',
  clientSecret: 's',
  redirectUri: 'http://localhost/cb',
  store: new CacheMemoryAdapter(),
  onProfile(args) {
    // @ts-expect-error 纯 OAuth2 无 oidc
    args.oidc;
    const { token, userinfo } = args;
    expectType<TypeEqual<TwitterUser, typeof userinfo>>(true);
    return { accessToken: token.access_token };
  },
});
