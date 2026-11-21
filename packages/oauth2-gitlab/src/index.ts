import { OAuth2Client } from '@aomex/oauth2-client';
import {
  mergeOAuth2Preset,
  type OAuth2Profile,
  type OAuth2VendorOptions,
} from '@aomex-contrib/oauth2-preset';

/**
 * GitLab.com OAuth2 客户端预设
 * @see https://docs.gitlab.com/ee/api/oauth2.html
 */
const gitlab = {
  authorizationEndpoint: 'https://gitlab.com/oauth/authorize',
  tokenEndpoint: 'https://gitlab.com/oauth/token',
  revocationEndpoint: 'https://gitlab.com/oauth/revoke',
  scopes: ['read_user'],
} as const;

/**
 * `GET /api/v4/user` 常见字段
 * @see https://docs.gitlab.com/ee/api/users.html#list-current-user
 */
export type GitLabUser = {
  /** 用户 ID */
  id: number;
  /** 用户名 */
  username: string;
  /** 显示名 */
  name: string;
  /** 邮箱（需足够的 scope，如 `read_user`） */
  email: string;
  /** 头像 URL */
  avatar_url: string;
  /** 用户主页 URL */
  web_url: string;
};

export function resolveGitLabUserInfoUrl(tokenEndpoint: string): string {
  return `${new URL(tokenEndpoint).origin}/api/v4/user`;
}

export async function fetchGitLabUser(
  accessToken: string,
  userInfoUrl: string,
): Promise<GitLabUser> {
  const res = await fetch(userInfoUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error(`GitLab /api/v4/user failed: ${res.status}`);
  }
  return (await res.json()) as GitLabUser;
}

/**
 * GitLab OAuth2 客户端；默认按 `tokenEndpoint` 同源拉取 `/api/v4/user`（自建实例也适用）
 */
export class GitLabOAuth2Client<
  Profile = OAuth2Profile<GitLabUser>,
> extends OAuth2Client<Profile> {
  constructor(opts: OAuth2VendorOptions<Profile, GitLabUser>) {
    const tokenEndpoint = opts.tokenEndpoint ?? gitlab.tokenEndpoint;
    super(
      mergeOAuth2Preset(gitlab, opts, (accessToken) =>
        fetchGitLabUser(accessToken, resolveGitLabUserInfoUrl(tokenEndpoint)),
      ),
    );
  }
}

export type {
  OAuth2Profile,
  OAuth2VendorOptions,
  OAuth2VendorOnProfileArgs,
} from '@aomex-contrib/oauth2-preset';
