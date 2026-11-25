# @aomex-contrib/oauth2-spotify

Spotify OAuth2 登录预设。换票使用 **HTTP Basic**（`tokenAuth: 'basic'`）。默认 `callback` 拉取 [`GET /v1/me`](https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile)，返回 `{ base, userinfo }`。

官方文档：[Authorization](https://developer.spotify.com/documentation/web-api/concepts/authorization)。

---

## 1. 安装

```bash
pnpm add @aomex-contrib/oauth2-spotify @aomex/oauth2-client
```

---

## 2. Spotify 后台准备

1. 打开 [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) → Create app
2. 填写 App 名称、描述；Redirect URI 添加：  
   `https://example.com/oauth/spotify/callback`
3. 同意条款 → 创建
4. 进入 App → Settings：复制 **Client ID**，查看 **Client Secret**

| 环境变量建议            | 对应          |
| ----------------------- | ------------- |
| `SPOTIFY_CLIENT_ID`     | Client ID     |
| `SPOTIFY_CLIENT_SECRET` | Client Secret |

本包默认 scope 仅 `user-read-email`（够登录拿基本资料）。若还要播控、歌单等，在 [Scopes](https://developer.spotify.com/documentation/web-api/concepts/scopes) 里选好后通过构造参数 `scopes` 传入。

---

## 3. store

保存 OAuth `state`。生产用共享 Redis。

---

## 4. 最小可跑通示例

```ts
import { Caching } from '@aomex/cache';
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { SpotifyOAuth2Client } from '@aomex-contrib/oauth2-spotify';

const spotify = new SpotifyOAuth2Client({
  clientId: process.env.SPOTIFY_CLIENT_ID!,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
  redirectUri: 'https://example.com/oauth/spotify/callback',
  store: new Caching(new CacheMemoryAdapter()),
  // 默认 scopes: user-read-email
  // scopes: ['user-read-email', 'user-library-read'],
});

router.get('/oauth/spotify', {
  action: async (ctx) => {
    await spotify.redirect(ctx);
  },
});

router.get('/oauth/spotify/callback', {
  action: async (ctx) => {
    const profile = await spotify.callback(ctx);
    // profile.base = 令牌；profile.userinfo = SpotifyUser
    ctx.send(profile);
  },
});
```

换票时本包预设 `tokenAuth: 'basic'`（Client ID/Secret 放 Authorization 头），与 Spotify 文档一致，一般无需改。

---

## 5. 默认返回什么

默认 `callback` 返回：

```ts
{
  base: TokenSet; // access_token 等
  userinfo: SpotifyUser; // 来自 `GET /v1/me`
}
```

`SpotifyUser` 常见字段：`id`、`display_name`、`email`、`images`。

自定义 `onProfile` 时框架已拉好 `userinfo`：

```ts
onProfile: async ({ token, userinfo }) => {
  return upsertUser({ id: userinfo.id /* 或对应字段 */ });
},
```

也可直接：`import { fetchSpotifyUser } from '@aomex-contrib/oauth2-spotify'`。

---

## 6. 默认预设

```ts
authorizationEndpoint: 'https://accounts.spotify.com/authorize';
tokenEndpoint: 'https://accounts.spotify.com/api/token';
scopes: ['user-read-email'];
tokenAuth: 'basic';
```

---

## 7. 常见问题

**Q: INVALID_CLIENT: Invalid redirect URI？**  
A: Dashboard → Redirect URIs 必须包含与代码完全相同的地址；改完有时需稍等生效。

**Q: 没有 email？**  
A: 需要 `user-read-email`，且用户 Spotify 账号已验证邮箱。

**Q: 开发模式用户限制？**  
A: 扩展配额 / 模式前，可能只能白名单用户登录；在 Dashboard 用户管理里添加。

---

通用能力见：https://aomex.js.org
