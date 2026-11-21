import { OAuth2Client } from '@aomex/oauth2-client';
import {
  mergeOAuth2Preset,
  type OAuth2Profile,
  type OAuth2VendorOptions,
} from '@aomex-contrib/oauth2-preset';

/**
 * Twitter（X）OAuth2 客户端预设
 * @see https://docs.x.com/resources/fundamentals/authentication/oauth-2-0/authorization-code
 */
export const twitter = {
  authorizationEndpoint: 'https://x.com/i/oauth2/authorize',
  tokenEndpoint: 'https://api.x.com/2/oauth2/token',
  scopes: ['tweet.read', 'users.read', 'offline.access'],
} as const;

/**
 * `GET /2/users/me` 的 `data`
 * @see https://docs.x.com/x-api/users/get-me
 */
export type TwitterUser = {
  /** 用户 ID */
  id: string;
  /** 显示名 */
  name: string;
  /** @handle（不含 `@`） */
  username: string;
  /** 头像 URL（请求 `user.fields=profile_image_url` 时返回） */
  profile_image_url?: string;
};

type TwitterUsersMeResponse = {
  data: TwitterUser;
};

export async function fetchTwitterUser(accessToken: string): Promise<TwitterUser> {
  const url = new URL('https://api.x.com/2/users/me');
  url.searchParams.set('user.fields', 'id,name,username,profile_image_url');
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error(`Twitter /2/users/me failed: ${res.status}`);
  }
  const json = (await res.json()) as TwitterUsersMeResponse;
  if (!json.data?.id) {
    throw new Error('Twitter /2/users/me missing data');
  }
  return json.data;
}

/**
 * Twitter（X）OAuth2 客户端；默认 `callback` 返回 `{ base, userinfo }`（`userinfo` 来自 `/2/users/me`）
 */
export class TwitterOAuth2Client<
  Profile = OAuth2Profile<TwitterUser>,
> extends OAuth2Client<Profile> {
  constructor(opts: OAuth2VendorOptions<Profile, TwitterUser>) {
    super(mergeOAuth2Preset(twitter, opts, fetchTwitterUser));
  }
}

export type {
  OAuth2Profile,
  OAuth2VendorOptions,
  OAuth2VendorOnProfileArgs,
} from '@aomex-contrib/oauth2-preset';
