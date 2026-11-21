# @aomex-contrib/oauth2-github

GitHub **OAuth App** 登录预设。默认 `callback` 拉取 [`GET /user`](https://docs.github.com/en/rest/users/users#get-the-authenticated-user)，返回 `{ base, userinfo }`。

官方文档：[Authorizing OAuth apps](https://docs.github.com/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)。

---

## 1. 安装

```bash
pnpm add @aomex-contrib/oauth2-github @aomex/oauth2-client
```

---

## 2. GitHub 后台准备

1. GitHub → Settings → Developer settings → [OAuth Apps](https://github.com/settings/developers) → New OAuth App
2. 填写：
   - Application name
   - Homepage URL：如 `https://example.com`
   - **Authorization callback URL**：`https://example.com/oauth/github/callback`（须与代码一致）
3. 创建后复制 **Client ID**，再 Generate a new client secret

| 环境变量建议           | 对应          |
| ---------------------- | ------------- |
| `GITHUB_CLIENT_ID`     | Client ID     |
| `GITHUB_CLIENT_SECRET` | Client secret |

说明：这是 **OAuth App**，不是 GitHub App。若你用的是 GitHub App 用户授权，端点/流程不同，本预设按 OAuth App 编写。

---

## 3. store

保存 OAuth `state`。生产多实例用 Redis 等共享 `CacheAdapter`；单机可用 `CacheMemoryAdapter`。

---

## 4. 最小可跑通示例

```ts
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { GitHubOAuth2Client } from '@aomex-contrib/oauth2-github';

const github = new GitHubOAuth2Client({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  redirectUri: 'https://example.com/oauth/github/callback',
  store: new CacheMemoryAdapter(),
  // 默认 scopes: read:user, user:email
});

router.get('/oauth/github', {
  action: async (ctx) => {
    await github.redirect(ctx);
  },
});

router.get('/oauth/github/callback', {
  action: async (ctx) => {
    const profile = await github.callback(ctx);
    // profile.base = 令牌；profile.userinfo = GitHubUser
    ctx.send(profile);
  },
});
```

### 流程

1. `/oauth/github` → 302 到 GitHub 授权页
2. 用户同意 → 回到回调带 `code` + `state`
3. 换票 → 默认请求 `https://api.github.com/user` → 返回 `{ base, userinfo: GitHubUser }`
4. 你自己写登录态

---

## 5. 默认返回什么

默认 `callback` 返回：

```ts
{
  base: TokenSet; // access_token 等
  userinfo: GitHubUser; // 来自 `GET /user`
}
```

`GitHubUser` 常见字段：`id`、`login`、`name`、`email`、`avatar_url`、`html_url`。

自定义 `onProfile` 时框架已拉好 `userinfo`：

```ts
onProfile: async ({ token, userinfo }) => {
  return upsertUser({ id: userinfo.id /* 或对应字段 */ });
},
```

也可直接：`import { fetchGitHubUser, github } from '@aomex-contrib/oauth2-github'`。

---

## 6. 默认预设

```ts
authorizationEndpoint: 'https://github.com/login/oauth/authorize';
tokenEndpoint: 'https://github.com/login/oauth/access_token';
scopes: ['read:user', 'user:email'];
```

可用构造参数 `scopes` / 端点字段覆盖（例如只要 `read:user`）。

---

## 7. 常见问题

**Q: redirect_uri 不匹配？**  
A: OAuth App 回调 URL 与 `redirectUri` 必须一致。

**Q: email 为空？**  
A: 用户隐私设置；用 `user:emails` API 或引导用户公开邮箱。

**Q: Enterprise Server？**  
A: 本预设指向 github.com。自建可覆盖 `authorizationEndpoint` / `tokenEndpoint`，并自行改 `onProfile` 里的 API Host。

---

通用能力见：https://aomex.js.org
