import { OAuth2Client } from '@aomex/oauth2-client';
import {
  mergeOAuth2Preset,
  type OAuth2Profile,
  type OAuth2VendorOptions,
} from '@aomex-contrib/oauth2-preset';

/**
 * Facebook Login OAuth2 客户端预设
 * @see https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow
 */
const facebook = {
  authorizationEndpoint: 'https://www.facebook.com/v21.0/dialog/oauth',
  tokenEndpoint: 'https://graph.facebook.com/v21.0/oauth/access_token',
  scopes: ['email', 'public_profile'],
} as const;

/**
 * Graph `GET /me` 默认字段（`fields=id,name,email`）
 * @see https://developers.facebook.com/docs/graph-api/reference/user
 */
export type FacebookUser = {
  /** 应用范围内的用户 ID（app-scoped） */
  id: string;
  /** 用户姓名 */
  name: string;
  /** 邮箱；需 `email` 权限，且用户可能未授权 */
  email?: string;
};

export async function fetchFacebookUser(accessToken: string): Promise<FacebookUser> {
  const url = new URL('https://graph.facebook.com/v21.0/me');
  url.searchParams.set('fields', 'id,name,email');
  url.searchParams.set('access_token', accessToken);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Facebook /me failed: ${res.status}`);
  }
  return (await res.json()) as FacebookUser;
}

/**
 * Facebook Login 客户端；默认 `callback` 返回 `{ base, userinfo }`（`userinfo` 来自 Graph `/me`）
 */
export class FacebookOAuth2Client<
  Profile = OAuth2Profile<FacebookUser>,
> extends OAuth2Client<Profile> {
  constructor(opts: OAuth2VendorOptions<Profile, FacebookUser>) {
    super(mergeOAuth2Preset(facebook, opts, fetchFacebookUser));
  }
}

export type {
  OAuth2Profile,
  OAuth2VendorOptions,
  OAuth2VendorOnProfileArgs,
} from '@aomex-contrib/oauth2-preset';
