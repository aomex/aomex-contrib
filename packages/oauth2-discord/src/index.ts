import { OAuth2Client } from '@aomex/oauth2-client';
import {
  mergeOAuth2Preset,
  type OAuth2Profile,
  type OAuth2VendorOptions,
} from '@aomex-contrib/oauth2-preset';

/**
 * Discord OAuth2 客户端预设
 * @see https://discord.com/developers/docs/topics/oauth2
 */
export const discord = {
  authorizationEndpoint: 'https://discord.com/api/oauth2/authorize',
  tokenEndpoint: 'https://discord.com/api/oauth2/token',
  revocationEndpoint: 'https://discord.com/api/oauth2/token/revoke',
  scopes: ['identify', 'email'],
} as const;

/**
 * `GET /users/@me` 常见字段
 * @see https://discord.com/developers/docs/resources/user#user-object
 */
export type DiscordUser = {
  /** 用户 ID（雪花） */
  id: string;
  /** 用户名（不含 discriminator 的新用户名体系） */
  username: string;
  /** 全局显示名；未设置时为 `null` */
  global_name: string | null;
  /** 头像 hash；需自行按 CDN 规则拼 URL；无头像时为 `null` */
  avatar: string | null;
  /** 邮箱；需 `email` scope，可能为 `null` */
  email?: string | null;
  /** 邮箱是否已验证；需 `email` scope */
  verified?: boolean;
};

export async function fetchDiscordUser(accessToken: string): Promise<DiscordUser> {
  const res = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error(`Discord /users/@me failed: ${res.status}`);
  }
  return (await res.json()) as DiscordUser;
}

/**
 * Discord OAuth2 客户端；默认 `callback` 返回 `{ base, userinfo }`（`/users/@me`）
 */
export class DiscordOAuth2Client<
  Profile = OAuth2Profile<DiscordUser>,
> extends OAuth2Client<Profile> {
  constructor(opts: OAuth2VendorOptions<Profile, DiscordUser>) {
    super(mergeOAuth2Preset(discord, opts, fetchDiscordUser));
  }
}

export type {
  OAuth2Profile,
  OAuth2VendorOptions,
  OAuth2VendorOnProfileArgs,
} from '@aomex-contrib/oauth2-preset';
