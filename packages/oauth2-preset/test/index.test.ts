import { expect, test } from 'vitest';
import { mergeOAuth2Preset, mergeOidcPreset } from '../src';

const baseOpts = {
  clientId: 'cid',
  clientSecret: 'sec',
  redirectUri: 'https://app/cb',
  store: {} as never,
};

test('mergeOAuth2Preset：默认返回 { base, userinfo }', async () => {
  const opts = mergeOAuth2Preset(
    {
      authorizationEndpoint: 'https://example.com/auth',
      tokenEndpoint: 'https://example.com/token',
      scopes: ['a'],
    },
    { ...baseOpts, scopes: ['b'] },
    async (accessToken) => ({ id: accessToken }),
  );

  expect(opts.authorizationEndpoint).toBe('https://example.com/auth');
  expect(opts.tokenEndpoint).toBe('https://example.com/token');
  expect(opts.scopes).toEqual(['b']);
  await expect(
    opts.onProfile({
      token: { access_token: 'at', token_type: 'bearer' },
      ctx: {} as never,
    }),
  ).resolves.toEqual({
    base: { access_token: 'at', token_type: 'bearer' },
    userinfo: { id: 'at' },
  });
});

test('mergeOAuth2Preset：自定义 onProfile 仍先拉 userinfo', async () => {
  const opts = mergeOAuth2Preset(
    {
      authorizationEndpoint: 'https://example.com/auth',
      tokenEndpoint: 'https://example.com/token',
    },
    {
      ...baseOpts,
      onProfile: async ({ userinfo }) => userinfo.id,
    },
    async () => ({ id: 'u1' }),
  );

  await expect(
    opts.onProfile({
      token: { access_token: 'at', token_type: 'bearer' },
      ctx: {} as never,
    }),
  ).resolves.toBe('u1');
});

test('mergeOidcPreset：issuer 可覆盖，onProfile 透传', () => {
  const opts = mergeOidcPreset(
    { oidc: { issuer: 'https://accounts.example.com' } },
    {
      ...baseOpts,
      oidc: { issuer: 'https://custom.example.com' },
    },
  );

  expect(opts.oidc.issuer).toBe('https://custom.example.com');
  expect(opts.onProfile).toBeUndefined();
});
