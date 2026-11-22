import { expectType, type TypeEqual } from 'ts-expect';
import {
  WechatMiniProgramLoginClient,
  type WechatMiniProgramPhoneInfo,
  type WechatMiniProgramSession,
} from '../src';

declare const mini: WechatMiniProgramLoginClient;
declare const session: Awaited<ReturnType<typeof mini.code2Session>>;
expectType<TypeEqual<WechatMiniProgramSession, typeof session>>(true);
expectType<TypeEqual<string, typeof session.openid>>(true);
expectType<TypeEqual<string, typeof session.session_key>>(true);

declare const phone: Awaited<ReturnType<typeof mini.getPhoneNumber>>;
expectType<TypeEqual<WechatMiniProgramPhoneInfo, typeof phone>>(true);
expectType<TypeEqual<string, typeof phone.purePhoneNumber>>(true);

declare const token: Awaited<ReturnType<typeof mini.getAccessToken>>;
expectType<TypeEqual<string, typeof token>>(true);
