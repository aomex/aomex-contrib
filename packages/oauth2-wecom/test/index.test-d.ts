import { Caching } from '@aomex/cache';
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expectType, type TypeEqual } from 'ts-expect';
import { WecomOAuth2Client, type WecomProfile } from '../src';

const defaultClient = new WecomOAuth2Client({
  corpId: 'ww',
  corpSecret: 'sec',
  agentId: 1000002,
  redirectUri: 'https://example.com/cb',
  store: new Caching(new CacheMemoryAdapter()),
  scopes: ['snsapi_base'],
});
declare const defaultProfile: Awaited<ReturnType<typeof defaultClient.callback>>;
expectType<TypeEqual<WecomProfile, typeof defaultProfile>>(true);

new WecomOAuth2Client({
  corpId: 'ww',
  corpSecret: 'sec',
  agentId: 1000002,
  redirectUri: 'https://example.com/cb',
  store: new Caching(new CacheMemoryAdapter()),
  scopes: ['snsapi_base'],
  onProfile({ profile }) {
    expectType<TypeEqual<WecomProfile, typeof profile>>(true);
    expectType<TypeEqual<string | undefined, typeof profile.userid>>(true);
    // @ts-expect-error WecomProfile 无伪装 access_token
    profile.access_token;
    return { id: profile.userid ?? profile.openid };
  },
});

new WecomOAuth2Client({
  corpId: 'ww',
  corpSecret: 'sec',
  agentId: '1000002',
  redirectUri: 'https://example.com/cb',
  store: new Caching(new CacheMemoryAdapter()),
  scopes: ['snsapi_privateinfo'],
  onProfile: async ({ profile }) => profile.userid,
});

new WecomOAuth2Client({
  corpId: 'ww',
  corpSecret: 'sec',
  agentId: 1,
  redirectUri: 'https://example.com/cb',
  store: new Caching(new CacheMemoryAdapter()),
  // @ts-expect-error 企微 scope 仅 snsapi_base / snsapi_privateinfo
  scopes: ['snsapi_userinfo'],
});

new WecomOAuth2Client({
  corpId: 'ww',
  corpSecret: 'sec',
  agentId: 1,
  redirectUri: 'https://example.com/cb',
  store: new Caching(new CacheMemoryAdapter()),
  scopes: ['snsapi_base'],
  // @ts-expect-error 应用用 corpId，不是 clientId
  clientId: 'ww',
});
