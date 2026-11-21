import { expectType, type TypeEqual } from 'ts-expect';
import { WechatMiniProgramLoginClient, type WechatMiniProgramSession } from '../src';

declare const mini: WechatMiniProgramLoginClient;
declare const session: Awaited<ReturnType<typeof mini.code2Session>>;
expectType<TypeEqual<WechatMiniProgramSession, typeof session>>(true);
expectType<TypeEqual<string, typeof session.openid>>(true);
expectType<TypeEqual<string, typeof session.session_key>>(true);
