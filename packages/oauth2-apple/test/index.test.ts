import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { exportPKCS8, generateKeyPair } from 'jose';
import { expect, test } from 'vitest';
import { AppleOAuth2Client, apple } from '../src';
import { i18n } from '../src/i18n';

test('预设含 form_post 与 issuer', () => {
  expect(apple.oidc.issuer).toBe('https://appleid.apple.com');
  expect(apple.authorizationParams.response_mode).toBe('form_post');
});

test('构造：缺 teamId / keyId / privateKey 抛错', async () => {
  const { privateKey } = await generateKeyPair('ES256', {
    extractable: true,
  });
  const pem = await exportPKCS8(privateKey);
  const store = new CacheMemoryAdapter();
  const base = {
    clientId: 'com.example.app',
    redirectUri: 'https://example.com/cb',
    store,
    onProfile: async ({ oidc }: { oidc: { claims: { sub: string } } }) => oidc.claims.sub,
  };

  expect(
    () =>
      new AppleOAuth2Client({
        ...base,
        teamId: '',
        keyId: 'kid',
        privateKey: pem,
      }),
  ).toThrow(i18n.t('team_id_empty'));

  expect(
    () =>
      new AppleOAuth2Client({
        ...base,
        teamId: 'TEAM',
        keyId: '',
        privateKey: pem,
      }),
  ).toThrow(i18n.t('key_id_empty'));

  expect(
    () =>
      new AppleOAuth2Client({
        ...base,
        teamId: 'TEAM',
        keyId: 'kid',
        privateKey: '',
      }),
  ).toThrow(i18n.t('private_key_empty'));
});

test('readCallbackInput 优先 body，并解析一次性 user', async () => {
  const { privateKey } = await generateKeyPair('ES256', {
    extractable: true,
  });
  const pem = await exportPKCS8(privateKey);
  const client = new AppleOAuth2Client({
    clientId: 'com.example.app',
    teamId: 'TEAM',
    keyId: 'kid',
    privateKey: pem,
    redirectUri: 'https://example.com/cb',
    store: new CacheMemoryAdapter(),
  });

  const input = client['readCallbackInput']({
    request: {
      body: {
        code: 'from-body',
        state: 'state-body',
        error: '',
        user: JSON.stringify({
          email: 'a@b.c',
          name: { firstName: 'Ada', lastName: 'Lovelace' },
        }),
      },
      query: { code: 'from-query', state: 'state-query' },
    },
  } as never);

  expect(input).toEqual({
    code: 'from-body',
    state: 'state-body',
    error: undefined,
  });
  expect(client['formUserRef'].current).toEqual({
    email: 'a@b.c',
    name: { firstName: 'Ada', lastName: 'Lovelace' },
  });
});

test('clientSecret 签发为 JWT', async () => {
  const { privateKey } = await generateKeyPair('ES256', {
    extractable: true,
  });
  const pem = await exportPKCS8(privateKey);
  const client = new AppleOAuth2Client({
    clientId: 'com.example.app',
    teamId: 'TEAMID',
    keyId: 'KEYID',
    privateKey: pem,
    redirectUri: 'https://example.com/cb',
    store: new CacheMemoryAdapter(),
    onProfile: async ({ oidc }) => oidc.claims.sub,
  });

  const secret = await client['resolveClientSecret']();
  const parts = secret.split('.');
  expect(parts).toHaveLength(3);
  const payload = JSON.parse(
    Buffer.from(parts[1]!, 'base64url').toString('utf8'),
  ) as Record<string, unknown>;
  expect(payload['iss']).toBe('TEAMID');
  expect(payload['sub']).toBe('com.example.app');
  expect(payload['aud']).toBe('https://appleid.apple.com');
});
