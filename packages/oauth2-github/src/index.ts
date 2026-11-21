import { OAuth2Client } from '@aomex/oauth2-client';
import {
  mergeOAuth2Preset,
  type OAuth2Profile,
  type OAuth2VendorOptions,
} from '@aomex-contrib/oauth2-preset';

/**
 * GitHub OAuth2 客户端预设
 * @see https://docs.github.com/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
 */
const github = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  scopes: ['read:user', 'user:email'],
} as const;

/**
 * `GET https://api.github.com/user` 常见字段
 * @see https://docs.github.com/en/rest/users/users#get-the-authenticated-user
 */
export type GitHubUser = {
  /** 用户数字 ID */
  id: number;
  /** 用户名（login） */
  login: string;
  /** 显示名；未设置时为 `null` */
  name: string | null;
  /**
   * 公开主邮箱；用户隐藏邮箱时可能为 `null`。
   * 需要完整邮箱列表时可另调 `/user/emails`
   */
  email: string | null;
  /** 头像 URL */
  avatar_url: string;
  /** 用户主页 URL */
  html_url: string;
};

export async function fetchGitHubUser(accessToken: string): Promise<GitHubUser> {
  const res = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github+json',
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub /user failed: ${res.status}`);
  }
  return (await res.json()) as GitHubUser;
}

/**
 * GitHub OAuth2 客户端；默认 `callback` 返回 `{ base, userinfo }`（`userinfo` 来自 `/user`）
 */
export class GitHubOAuth2Client<
  Profile = OAuth2Profile<GitHubUser>,
> extends OAuth2Client<Profile> {
  constructor(opts: OAuth2VendorOptions<Profile, GitHubUser>) {
    super(mergeOAuth2Preset(github, opts, fetchGitHubUser));
  }
}

export type {
  OAuth2Profile,
  OAuth2VendorOptions,
  OAuth2VendorOnProfileArgs,
} from '@aomex-contrib/oauth2-preset';
