# @aomex-contrib/oauth2-discord

Discord OAuth2 登录预设。默认 `callback` 拉取 [`GET /users/@me`](https://discord.com/developers/docs/resources/user#get-current-user)，返回 `{ base, userinfo }`。

官方文档：[OAuth2](https://discord.com/developers/docs/topics/oauth2)。

---

## 1. 安装

```bash
pnpm add @aomex-contrib/oauth2-discord @aomex/oauth2-client
```

---

## 2. Discord 后台准备

1. 打开 [Discord Developer Portal](https://discord.com/developers/applications) → New Application
2. OAuth2 → General：复制 **Client ID**、**Client Secret**
3. OAuth2 → Redirects：添加  
   `https://example.com/oauth/discord/callback`
4. （可选）在 OAuth2 URL Generator 里勾选 `identify`、`email` 预览链接；实际授权由本包生成

| 环境变量建议            | 对应          |
| ----------------------- | ------------- |
| `DISCORD_CLIENT_ID`     | Client ID     |
| `DISCORD_CLIENT_SECRET` | Client Secret |

---

## 3. store

保存 OAuth `state`。生产用共享 Redis；本地可用 `CacheMemoryAdapter`。

---

## 4. 最小可跑通示例

```ts
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { DiscordOAuth2Client } from '@aomex-contrib/oauth2-discord';

const discord = new DiscordOAuth2Client({
  clientId: process.env.DISCORD_CLIENT_ID!,
  clientSecret: process.env.DISCORD_CLIENT_SECRET!,
  redirectUri: 'https://example.com/oauth/discord/callback',
  store: new CacheMemoryAdapter(),
  // 默认 scopes: identify, email
});

router.get('/oauth/discord', {
  action: async (ctx) => {
    await discord.redirect(ctx);
  },
});

router.get('/oauth/discord/callback', {
  action: async (ctx) => {
    const profile = await discord.callback(ctx);
    // profile.base = 令牌；profile.userinfo = DiscordUser
    ctx.send(profile);
  },
});
```

流程：跳转授权 → 回调带 code → 换票 → `/users/@me` → 你写登录态。

---

## 5. 默认返回什么

默认 `callback` 返回：

```ts
{
  base: TokenSet; // access_token 等
  userinfo: DiscordUser; // 来自 `GET /users/@me`
}
```

`DiscordUser` 常见字段：`id`、`username`、`global_name`、`avatar`、`email?`、`verified?`。

自定义 `onProfile` 时框架已拉好 `userinfo`：

```ts
onProfile: async ({ token, userinfo }) => {
  return upsertUser({ id: userinfo.id /* 或对应字段 */ });
},
```

也可直接：`import { fetchDiscordUser, discord } from '@aomex-contrib/oauth2-discord'`。

---

## 6. 默认预设

```ts
authorizationEndpoint: 'https://discord.com/api/oauth2/authorize';
tokenEndpoint: 'https://discord.com/api/oauth2/token';
revocationEndpoint: 'https://discord.com/api/oauth2/token/revoke';
scopes: ['identify', 'email'];
```

需要进服务器 / 加好友等能力时，按 [scope 列表](https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes) 自行传 `scopes`。

---

## 7. 常见问题

**Q: redirect_uri 无效？**  
A: Developer Portal → Redirects 必须包含与代码完全相同的 URI。

**Q: 没有 email？**  
A: 需要 `email` scope，且用户账号已验证邮箱。

---

通用能力见：https://aomex.js.org
