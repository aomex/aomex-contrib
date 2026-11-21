import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expectType, type TypeEqual } from 'ts-expect';
import { GitHubOAuth2Client, type GitHubUser, type OAuth2Profile } from '../src';

const defaultClient = new GitHubOAuth2Client({
  clientId: 'cid',
  clientSecret: 's',
  redirectUri: 'http://localhost/cb',
  store: new CacheMemoryAdapter(),
});
declare const defaultProfile: Awaited<ReturnType<typeof defaultClient.callback>>;
expectType<TypeEqual<OAuth2Profile<GitHubUser>, typeof defaultProfile>>(true);

new GitHubOAuth2Client({
  clientId: 'cid',
  clientSecret: 's',
  redirectUri: 'http://localhost/cb',
  store: new CacheMemoryAdapter(),
  onProfile(args) {
    // @ts-expect-error 纯 OAuth2 无 oidc
    args.oidc;
    expectType<TypeEqual<GitHubUser, typeof args.userinfo>>(true);
    return { accessToken: args.token.access_token, login: args.userinfo.login };
  },
});
