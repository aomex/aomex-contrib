import { expectType, type TypeEqual } from 'ts-expect';
import {
  GoogleIdentityLoginClient,
  type GoogleAuthCodeTokenSet,
  type GoogleIdentityClaims,
  type GoogleUserInfo,
} from '../src';

declare const client: GoogleIdentityLoginClient;

declare const claims: Awaited<ReturnType<typeof client.verifyCredential>>;
expectType<TypeEqual<GoogleIdentityClaims, typeof claims>>(true);
expectType<TypeEqual<string, typeof claims.sub>>(true);

declare const userinfo: Awaited<ReturnType<typeof client.fetchUserInfo>>;
expectType<TypeEqual<GoogleUserInfo, typeof userinfo>>(true);

declare const token: Awaited<ReturnType<typeof client.exchangeAuthCode>>;
expectType<TypeEqual<GoogleAuthCodeTokenSet, typeof token>>(true);

declare const refreshed: Awaited<ReturnType<typeof client.refreshAccessToken>>;
expectType<TypeEqual<GoogleAuthCodeTokenSet, typeof refreshed>>(true);

declare const both: Awaited<ReturnType<typeof client.exchangeAuthCodeAndVerify>>;
expectType<TypeEqual<GoogleIdentityClaims | null, typeof both.claims>>(true);
