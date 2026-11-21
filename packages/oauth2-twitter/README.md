# @aomex-contrib/oauth2-twitter

Twitter（X）**OAuth 2.0** 登录预设。默认 `callback` 拉取 [`GET /2/users/me`](https://docs.x.com/x-api/users/user-lookup-me)，返回 `{ base, userinfo }`。

官方文档：[OAuth 2.0 Authorization Code](https://docs.x.com/resources/fundamentals/authentication/oauth-2-0/authorization-code)。

---

## 1. 安装

```bash
pnpm add @aomex-contrib/oauth2-twitter @aomex/oauth2-client
```

---

## 2. X Developer 后台准备

1. 打开 [X Developer Portal](https://developer.x.com/) → 创建 / 进入 Project & App
2. App 设置里打开 **OAuth 2.0**
3. 填写：
   - Type of App：通常选 Web App
   - Callback URI / Redirect URL：`https://example.com/oauth/twitter/callback`
   - Website URL：你的站点
4. 复制 **Client ID**；若使用机密客户端，再保存 **Client Secret**
5. 确认 App 权限能覆盖本包默认 scopes：`tweet.read`、`users.read`、`offline.access`（以控制台实际可选项为准；免费 / 付费层级可能限制 API）

| 环境变量建议            | 对应                        |
| ----------------------- | --------------------------- |
| `TWITTER_CLIENT_ID`     | Client ID                   |
| `TWITTER_CLIENT_SECRET` | Client Secret（机密客户端） |

说明：X 还支持 Public Client + PKCE。本包走 `@aomex/oauth2-client` 常规机密客户端配置；若你只用 Public Client，需按主库文档自行开 PKCE 并视情况省略 secret。

---

## 3. store

保存 OAuth `state`。生产用共享 Redis。

---

## 4. 最小可跑通示例

```ts
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { TwitterOAuth2Client } from '@aomex-contrib/oauth2-twitter';

const twitter = new TwitterOAuth2Client({
  clientId: process.env.TWITTER_CLIENT_ID!,
  clientSecret: process.env.TWITTER_CLIENT_SECRET!,
  redirectUri: 'https://example.com/oauth/twitter/callback',
  store: new CacheMemoryAdapter(),
  // 默认 scopes: tweet.read, users.read, offline.access
});

router.get('/oauth/twitter', {
  action: async (ctx) => {
    await twitter.redirect(ctx);
  },
});

router.get('/oauth/twitter/callback', {
  action: async (ctx) => {
    const profile = await twitter.callback(ctx);
    // profile.base = 令牌；profile.userinfo = TwitterUser
    ctx.send(profile);
  },
});
```

---

## 5. 默认返回什么

默认 `callback` 返回：

```ts
{
  base: TokenSet; // access_token 等
  userinfo: TwitterUser; // 来自 `GET /2/users/me`
}
```

`TwitterUser` 常见字段：`id`、`name`、`username`、`profile_image_url?`。

自定义 `onProfile` 时框架已拉好 `userinfo`：

```ts
onProfile: async ({ token, userinfo }) => {
  return upsertUser({ id: userinfo.id /* 或对应字段 */ });
},
```

也可直接：`import { fetchTwitterUser, twitter } from '@aomex-contrib/oauth2-twitter'`。

---

## 6. 默认预设

```ts
authorizationEndpoint: 'https://x.com/i/oauth2/authorize';
tokenEndpoint: 'https://api.x.com/2/oauth2/token';
scopes: ['tweet.read', 'users.read', 'offline.access'];
```

---

## 7. 常见问题

**Q: Callback URL not approved？**  
A: Portal 里登记的 Callback 必须与 `redirectUri` 完全一致（含 https）。

**Q: 403 / 付费 API？**  
A: `/2/users/me` 受 X API 访问层级限制；确认项目套餐与 App 权限。

**Q: 只要登录不要读推文？**  
A: 仍可能需要 `users.read`；`tweet.read` 可按门户要求增减，但需与 App 权限一致。

---

通用能力见：https://aomex.js.org
