import { OAuth2Client } from '@aomex/oauth2-client';
import {
  mergeOAuth2Preset,
  type OAuth2Profile,
  type OAuth2VendorOptions,
} from '@aomex-contrib/oauth2-preset';

/**
 * LinkedIn OAuth2 客户端预设
 * @see https://learn.microsoft.com/linkedin/shared/authentication/authorization-code-flow
 */
const linkedin = {
  authorizationEndpoint: 'https://www.linkedin.com/oauth/v2/authorization',
  tokenEndpoint: 'https://www.linkedin.com/oauth/v2/accessToken',
  revocationEndpoint: 'https://www.linkedin.com/oauth/v2/revoke',
  scopes: ['openid', 'profile', 'email'],
} as const;

/**
 * OIDC UserInfo（`GET /v2/userinfo`）常见字段
 * @see https://learn.microsoft.com/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2
 */
export type LinkedInUser = {
  /** 主体标识（OpenID `sub`） */
  sub: string;
  /** 全名 */
  name?: string;
  /** 名 */
  given_name?: string;
  /** 姓 */
  family_name?: string;
  /** 头像 URL */
  picture?: string;
  /** 邮箱；需 `email` scope */
  email?: string;
  /** 邮箱是否已验证 */
  email_verified?: boolean;
};

export async function fetchLinkedInUser(accessToken: string): Promise<LinkedInUser> {
  const res = await fetch('https://api.linkedin.com/v2/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error(`LinkedIn /v2/userinfo failed: ${res.status}`);
  }
  return (await res.json()) as LinkedInUser;
}

/**
 * LinkedIn OAuth2 客户端；默认 `callback` 返回 `{ base, userinfo }`（`userinfo` 来自 `/v2/userinfo`）
 */
export class LinkedInOAuth2Client<
  Profile = OAuth2Profile<LinkedInUser>,
> extends OAuth2Client<Profile> {
  constructor(opts: OAuth2VendorOptions<Profile, LinkedInUser>) {
    super(mergeOAuth2Preset(linkedin, opts, fetchLinkedInUser));
  }
}

export type {
  OAuth2Profile,
  OAuth2VendorOptions,
  OAuth2VendorOnProfileArgs,
} from '@aomex-contrib/oauth2-preset';
