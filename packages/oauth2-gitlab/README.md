# @aomex-contrib/oauth2-gitlab

GitLab OAuth2 登录预设（默认指向 **GitLab.com**）。默认 `callback` 按 `tokenEndpoint` **同源**请求 `/api/v4/user`，因此自建 GitLab 只要改端点即可复用。

官方文档：[OAuth 2.0 identity provider API](https://docs.gitlab.com/ee/api/oauth2.html)。

---

## 1. 安装

```bash
pnpm add @aomex-contrib/oauth2-gitlab @aomex/oauth2-client
```

---

## 2. GitLab 后台准备（GitLab.com）

1. 头像 → Preferences → [Applications](https://gitlab.com/-/user_settings/applications)（或 Group/Instance 级应用，按你的权限）
2. 新建 Application：
   - Redirect URI：`https://example.com/oauth/gitlab/callback`
   - 勾选 scope：**read_user**（本包默认）
3. 保存后拿到 **Application ID**、**Secret**

| 环境变量建议           | 对应           |
| ---------------------- | -------------- |
| `GITLAB_CLIENT_ID`     | Application ID |
| `GITLAB_CLIENT_SECRET` | Secret         |

自建实例：在你的 GitLab「Admin / Applications」或用户 Applications 里同样创建，Redirect URI 指向你的回调。

---

## 3. store

保存 OAuth `state`。生产用共享存储。

---

## 4. 最小可跑通示例（GitLab.com）

```ts
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { GitLabOAuth2Client } from '@aomex-contrib/oauth2-gitlab';

const gitlab = new GitLabOAuth2Client({
  clientId: process.env.GITLAB_CLIENT_ID!,
  clientSecret: process.env.GITLAB_CLIENT_SECRET!,
  redirectUri: 'https://example.com/oauth/gitlab/callback',
  store: new CacheMemoryAdapter(),
  // 默认 scopes: read_user
});

router.get('/oauth/gitlab', {
  action: async (ctx) => {
    await gitlab.redirect(ctx);
  },
});

router.get('/oauth/gitlab/callback', {
  action: async (ctx) => {
    const profile = await gitlab.callback(ctx);
    // profile.base = 令牌；profile.userinfo = GitLabUser
    ctx.send(profile);
  },
});
```

---

## 5. 自建 GitLab

覆盖授权与换票端点即可；用户信息 URL 会由 `tokenEndpoint` 的 origin 推导为 `{origin}/api/v4/user`：

```ts
const gitlab = new GitLabOAuth2Client({
  clientId: process.env.GITLAB_CLIENT_ID!,
  clientSecret: process.env.GITLAB_CLIENT_SECRET!,
  redirectUri: 'https://example.com/oauth/gitlab/callback',
  store: new CacheMemoryAdapter(),
  authorizationEndpoint: 'https://gitlab.example.com/oauth/authorize',
  tokenEndpoint: 'https://gitlab.example.com/oauth/token',
  // 可选：revocationEndpoint: 'https://gitlab.example.com/oauth/revoke',
});
```

辅助函数：

```ts
import { resolveGitLabUserInfoUrl, fetchGitLabUser } from '@aomex-contrib/oauth2-gitlab';

const url = resolveGitLabUserInfoUrl('https://gitlab.example.com/oauth/token');
// => https://gitlab.example.com/api/v4/user
```

---

## 6. 默认返回什么

默认 `callback` 返回：

```ts
{
  base: TokenSet; // access_token 等
  userinfo: GitLabUser; // 来自 `GET /api/v4/user`
}
```

`GitLabUser` 常见字段：`id`、`username`、`name`、`email`、`avatar_url`、`web_url`。

自定义 `onProfile` 时框架已拉好 `userinfo`：

```ts
onProfile: async ({ token, userinfo }) => {
  return upsertUser({ id: userinfo.id /* 或对应字段 */ });
},
```

也可直接：`import { fetchGitLabUser } from '@aomex-contrib/oauth2-gitlab'`。

---

## 7. 默认预设

```ts
authorizationEndpoint: 'https://gitlab.com/oauth/authorize';
tokenEndpoint: 'https://gitlab.com/oauth/token';
revocationEndpoint: 'https://gitlab.com/oauth/revoke';
scopes: ['read_user'];
```

需要写仓库等权限时自行扩大 `scopes`（并在 GitLab Application 里勾选相同 scope）。

---

## 8. 常见问题

**Q: The redirect URI included is not valid？**  
A: Application 里登记的 Redirect URI 必须与 `redirectUri` 完全一致。

**Q: 自建仍打到 gitlab.com？**  
A: 必须同时覆盖 `authorizationEndpoint` 与 `tokenEndpoint`。

---

通用能力见：https://aomex.js.org
