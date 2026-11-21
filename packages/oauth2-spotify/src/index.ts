import { OAuth2Client } from '@aomex/oauth2-client';
import {
  mergeOAuth2Preset,
  type OAuth2Profile,
  type OAuth2VendorOptions,
} from '@aomex-contrib/oauth2-preset';

/**
 * Spotify OAuth2 客户端预设
 * @see https://developer.spotify.com/documentation/web-api/concepts/authorization
 */
const spotify = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
  scopes: ['user-read-email'],
  tokenAuth: 'basic',
} as const;

/**
 * `GET /v1/me` 常见字段
 * @see https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
 */
export type SpotifyUser = {
  /** Spotify 用户 ID */
  id: string;
  /** 显示名；可能为 `null` */
  display_name: string | null;
  /** 邮箱；需 `user-read-email` scope */
  email?: string;
  /** 头像列表 */
  images: {
    /** 图片 URL */
    url: string;
  }[];
  /** 外部链接 */
  external_urls: {
    /** Spotify 个人页 URL */
    spotify: string;
  };
};

export async function fetchSpotifyUser(accessToken: string): Promise<SpotifyUser> {
  const res = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error(`Spotify /v1/me failed: ${res.status}`);
  }
  return (await res.json()) as SpotifyUser;
}

/**
 * Spotify OAuth2 客户端；默认 `callback` 返回 `{ base, userinfo }`（`userinfo` 来自 `/v1/me`）
 */
export class SpotifyOAuth2Client<
  Profile = OAuth2Profile<SpotifyUser>,
> extends OAuth2Client<Profile> {
  constructor(opts: OAuth2VendorOptions<Profile, SpotifyUser>) {
    super(mergeOAuth2Preset(spotify, opts, fetchSpotifyUser));
  }
}

export type {
  OAuth2Profile,
  OAuth2VendorOptions,
  OAuth2VendorOnProfileArgs,
} from '@aomex-contrib/oauth2-preset';
