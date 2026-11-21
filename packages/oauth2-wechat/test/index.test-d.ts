import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { expectType, type TypeEqual } from 'ts-expect';
import {
  WechatMpOAuth2Client,
  WechatOpenOAuth2Client,
  type WechatSnsUserInfo,
  type WechatTokenSet,
} from '../src';

const mpUserinfo = new WechatMpOAuth2Client({
  appId: 'wx',
  appSecret: 'sec',
  redirectUri: 'https://example.com/cb',
  store: new CacheMemoryAdapter(),
  scopes: ['snsapi_userinfo'],
});
type MpUserinfoProfile = Awaited<ReturnType<typeof mpUserinfo.callback>>;
expectType<TypeEqual<WechatTokenSet, MpUserinfoProfile['base']>>(true);
expectType<TypeEqual<WechatSnsUserInfo, MpUserinfoProfile['userinfo']>>(true);

const mpBase = new WechatMpOAuth2Client({
  appId: 'wx',
  appSecret: 'sec',
  redirectUri: 'https://example.com/cb',
  store: new CacheMemoryAdapter(),
  scopes: ['snsapi_base'],
});
type MpBaseProfile = Awaited<ReturnType<typeof mpBase.callback>>;
expectType<TypeEqual<null, MpBaseProfile['userinfo']>>(true);

const open = new WechatOpenOAuth2Client({
  appId: 'wx',
  appSecret: 'sec',
  redirectUri: 'https://example.com/cb',
  store: new CacheMemoryAdapter(),
  scopes: ['snsapi_login'],
});
type OpenProfile = Awaited<ReturnType<typeof open.callback>>;
expectType<TypeEqual<WechatSnsUserInfo, OpenProfile['userinfo']>>(true);

new WechatOpenOAuth2Client({
  appId: 'wx',
  appSecret: 'sec',
  redirectUri: 'https://example.com/cb',
  store: new CacheMemoryAdapter(),
  scopes: ['snsapi_login'],
  onProfile({ token, userinfo }) {
    expectType<TypeEqual<WechatTokenSet, typeof token>>(true);
    expectType<TypeEqual<string, typeof token.openid>>(true);
    expectType<TypeEqual<string | undefined, typeof token.unionid>>(true);
    expectType<TypeEqual<number | undefined, typeof token.is_snapshotuser>>(true);
    expectType<TypeEqual<WechatSnsUserInfo | null, typeof userinfo>>(true);
    return { id: token.openid };
  },
});

new WechatMpOAuth2Client({
  appId: 'wx',
  appSecret: 'sec',
  redirectUri: 'https://example.com/cb',
  store: new CacheMemoryAdapter(),
  scopes: ['snsapi_base'],
  onProfile({ token, userinfo }) {
    expectType<TypeEqual<WechatSnsUserInfo | null, typeof userinfo>>(true);
    return token.openid;
  },
});

new WechatMpOAuth2Client({
  appId: 'wx',
  appSecret: 'sec',
  redirectUri: 'https://example.com/cb',
  store: new CacheMemoryAdapter(),
  // @ts-expect-error 公众号 scope 仅 snsapi_base / snsapi_userinfo
  scopes: ['snsapi_login'],
  onProfile: async () => '',
});

new WechatOpenOAuth2Client({
  appId: 'wx',
  appSecret: 'sec',
  redirectUri: 'https://example.com/cb',
  store: new CacheMemoryAdapter(),
  scopes: ['snsapi_login'],
  // @ts-expect-error 开放平台不用 clientId，应传 appId
  clientId: 'wx',
  onProfile: async () => '',
});
