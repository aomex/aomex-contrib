import {
  createLocalJWKSet,
  exportJWK,
  generateKeyPair,
  SignJWT,
  type JWTPayload,
} from 'jose';
import { afterEach, expect, test, vi } from 'vitest';
import { GoogleIdentityLoginClient } from '../src';
import { i18n } from '../src/i18n';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const CLIENT_ID = 'test-client-id.apps.googleusercontent.com';

type TestPrivateKey = Awaited<ReturnType<typeof generateKeyPair>>['privateKey'];

async function makeTestClient() {
  const { privateKey, publicKey } = await generateKeyPair('RS256', {
    extractable: true,
  });
  const jwk = await exportJWK(publicKey);
  jwk.kid = 'test-kid';
  jwk.alg = 'RS256';
  const jwks = createLocalJWKSet({ keys: [jwk] });
  const client = new GoogleIdentityLoginClient({
    clientId: CLIENT_ID,
    clientSecret: 'secret',
    jwks,
  });
  return { client, privateKey };
}

async function signCredential(
  privateKey: TestPrivateKey,
  claims: JWTPayload & { sub: string },
) {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({
    email: 'a@b.c',
    email_verified: true,
    name: 'Ada',
    ...claims,
  })
    .setProtectedHeader({ alg: 'RS256', kid: 'test-kid' })
    .setIssuer('https://accounts.google.com')
    .setAudience(CLIENT_ID)
    .setSubject(claims.sub)
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(privateKey);
}

function stubJsonFetch(handler: (url: URL, init?: RequestInit) => unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = new URL(String(input));
      return {
        ok: true,
        status: 200,
        json: async () => handler(url, init),
      };
    }),
  );
}

test('构造：空 clientId 抛错', () => {
  expect(() => new GoogleIdentityLoginClient({ clientId: '' })).toThrow(
    i18n.t('client_id_empty'),
  );
});

test('verifyCredential：验签成功', async () => {
  const { client, privateKey } = await makeTestClient();
  const credential = await signCredential(privateKey, { sub: 'uid-1' });
  const claims = await client.verifyCredential(credential);
  expect(claims.sub).toBe('uid-1');
  expect(claims.email).toBe('a@b.c');
  expect(claims.aud).toBe(CLIENT_ID);
});

test('verifyCredential：空 / 错误 aud 失败', async () => {
  const { client, privateKey } = await makeTestClient();
  await expect(client.verifyCredential('')).rejects.toThrow(i18n.t('credential_empty'));

  const badAud = await new SignJWT({ sub: 'u' })
    .setProtectedHeader({ alg: 'RS256', kid: 'test-kid' })
    .setIssuer('https://accounts.google.com')
    .setAudience('other-client')
    .setSubject('u')
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(privateKey);

  await expect(client.verifyCredential(badAud)).rejects.toThrow(
    /credential_verify_failed|Google credential/,
  );
});

test('verifyCredential：额外 audiences / hd', async () => {
  const { privateKey, publicKey } = await generateKeyPair('RS256', {
    extractable: true,
  });
  const jwk = await exportJWK(publicKey);
  jwk.kid = 'test-kid';
  jwk.alg = 'RS256';
  const jwks = createLocalJWKSet({ keys: [jwk] });
  const iosClientId = 'ios-client.apps.googleusercontent.com';
  const client = new GoogleIdentityLoginClient({
    clientId: CLIENT_ID,
    audiences: [iosClientId],
    hd: 'example.com',
    jwks,
  });

  const iosToken = await new SignJWT({ sub: 'ios-u', hd: 'example.com' })
    .setProtectedHeader({ alg: 'RS256', kid: 'test-kid' })
    .setIssuer('https://accounts.google.com')
    .setAudience(iosClientId)
    .setSubject('ios-u')
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(privateKey);
  await expect(client.verifyCredential(iosToken)).resolves.toMatchObject({
    sub: 'ios-u',
    hd: 'example.com',
  });

  const wrongHd = await signCredential(privateKey, {
    sub: 'u2',
    hd: 'other.com',
  });
  await expect(client.verifyCredential(wrongHd)).rejects.toThrow(
    i18n.t('hd_mismatch', {
      expected: 'example.com',
      actual: 'other.com',
    }),
  );

  const noHd = await signCredential(privateKey, { sub: 'u3' });
  await expect(client.verifyCredential(noHd)).rejects.toThrow(
    i18n.t('hd_mismatch', {
      expected: 'example.com',
      actual: '(none)',
    }),
  );
});

test('fetchUserInfo', async () => {
  const client = new GoogleIdentityLoginClient({ clientId: CLIENT_ID });
  await expect(client.fetchUserInfo('')).rejects.toThrow(i18n.t('access_token_empty'));

  stubJsonFetch((url) => {
    expect(url.href).toBe('https://www.googleapis.com/oauth2/v3/userinfo');
    return {
      sub: 'uid',
      email: 'u@g.com',
      name: 'User',
    };
  });

  await expect(client.fetchUserInfo('at')).resolves.toEqual({
    sub: 'uid',
    email: 'u@g.com',
    name: 'User',
  });

  const auth = (fetch as ReturnType<typeof vi.fn>).mock.calls[0]![1] as RequestInit;
  expect(auth.headers).toMatchObject({ Authorization: 'Bearer at' });
});

test('fetchUserInfo：HTTP 失败', async () => {
  const client = new GoogleIdentityLoginClient({ clientId: CLIENT_ID });
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({
      ok: false,
      status: 401,
      json: async () => ({}),
    })),
  );
  await expect(client.fetchUserInfo('bad')).rejects.toThrow(
    i18n.t('userinfo_failed', { status: '401' }),
  );
});

test('exchangeAuthCode：需要 secret，默认 redirect_uri=postmessage', async () => {
  const noSecret = new GoogleIdentityLoginClient({ clientId: CLIENT_ID });
  await expect(noSecret.exchangeAuthCode('c')).rejects.toThrow(
    i18n.t('client_secret_empty'),
  );

  const client = new GoogleIdentityLoginClient({
    clientId: CLIENT_ID,
    clientSecret: 'sec',
  });
  await expect(client.exchangeAuthCode('')).rejects.toThrow(i18n.t('auth_code_empty'));

  stubJsonFetch((url, init) => {
    expect(url.href).toBe('https://oauth2.googleapis.com/token');
    expect(init?.method).toBe('POST');
    const body = new URLSearchParams(String(init?.body));
    expect(body.get('code')).toBe('auth-code');
    expect(body.get('client_id')).toBe(CLIENT_ID);
    expect(body.get('client_secret')).toBe('sec');
    expect(body.get('redirect_uri')).toBe('postmessage');
    expect(body.get('grant_type')).toBe('authorization_code');
    return {
      access_token: 'at',
      token_type: 'Bearer',
      expires_in: 3599,
      id_token: 'idt',
      scope: 'openid email profile',
    };
  });

  await expect(client.exchangeAuthCode('auth-code')).resolves.toEqual({
    access_token: 'at',
    token_type: 'Bearer',
    expires_in: 3599,
    refresh_token: undefined,
    scope: 'openid email profile',
    id_token: 'idt',
  });
});

test('exchangeAuthCodeAndVerify', async () => {
  const { client, privateKey } = await makeTestClient();
  const idToken = await signCredential(privateKey, { sub: 'from-code' });

  stubJsonFetch(() => ({
    access_token: 'at',
    token_type: 'Bearer',
    id_token: idToken,
  }));

  const result = await client.exchangeAuthCodeAndVerify('c');
  expect(result.token.access_token).toBe('at');
  expect(result.claims?.sub).toBe('from-code');
});

test('refreshAccessToken', async () => {
  const noSecret = new GoogleIdentityLoginClient({ clientId: CLIENT_ID });
  await expect(noSecret.refreshAccessToken('rt')).rejects.toThrow(
    i18n.t('client_secret_empty'),
  );

  const client = new GoogleIdentityLoginClient({
    clientId: CLIENT_ID,
    clientSecret: 'sec',
  });
  await expect(client.refreshAccessToken('')).rejects.toThrow(
    i18n.t('refresh_token_empty'),
  );

  stubJsonFetch((url, init) => {
    expect(url.href).toBe('https://oauth2.googleapis.com/token');
    const body = new URLSearchParams(String(init?.body));
    expect(body.get('grant_type')).toBe('refresh_token');
    expect(body.get('refresh_token')).toBe('rt');
    expect(body.get('client_id')).toBe(CLIENT_ID);
    expect(body.get('client_secret')).toBe('sec');
    return {
      access_token: 'new-at',
      token_type: 'Bearer',
      expires_in: 3600,
      scope: 'openid email',
    };
  });

  await expect(client.refreshAccessToken('rt')).resolves.toEqual({
    access_token: 'new-at',
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token: undefined,
    scope: 'openid email',
    id_token: undefined,
  });
});
