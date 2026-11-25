# @aomex-contrib/oauth2-facebook

Facebook Login OAuth2 预设（Graph API **v21.0**）。默认 `callback` 拉取 Graph `/me`（字段 `id,name,email`），返回 `{ base, userinfo }`。

官方文档：[Manual Login Flow](https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow)。

---

## 1. 安装

```bash
pnpm add @aomex-contrib/oauth2-facebook @aomex/oauth2-client
```

---

## 2. Meta 后台准备

1. 打开 [Meta for Developers](https://developers.facebook.com/) → 创建应用 → 类型选「消费者」等合适类型
2. 添加产品：**Facebook 登录** → 网页
3. Facebook 登录 → 设置：
   - 有效 OAuth 重定向 URI：`https://example.com/oauth/facebook/callback`
4. 应用设置 → 基本：复制 **应用编号（App ID）**、**应用密钥（App Secret）**
5. 若应用处于开发模式：把测试用户 / 角色加进「角色」；上线需完成商务验证等（以 Meta 当前政策为准）
6. 权限：默认 `email`、`public_profile`；要 email 时确保用户授权且权限可用

| 环境变量建议    | 对应     |
| --------------- | -------- |
| `FB_APP_ID`     | 应用编号 |
| `FB_APP_SECRET` | 应用密钥 |

---

## 3. store

保存 OAuth `state`。生产用共享存储。

---

## 4. 最小可跑通示例

```ts
import { Caching } from '@aomex/cache';
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { FacebookOAuth2Client } from '@aomex-contrib/oauth2-facebook';

const facebook = new FacebookOAuth2Client({
  clientId: process.env.FB_APP_ID!,
  clientSecret: process.env.FB_APP_SECRET!,
  redirectUri: 'https://example.com/oauth/facebook/callback',
  store: new Caching(new CacheMemoryAdapter()),
  // 默认 scopes: email, public_profile
});

router.get('/oauth/facebook', {
  action: async (ctx) => {
    await facebook.redirect(ctx);
  },
});

router.get('/oauth/facebook/callback', {
  action: async (ctx) => {
    const profile = await facebook.callback(ctx);
    // profile.base = 令牌；profile.userinfo = FacebookUser
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
  userinfo: FacebookUser; // 来自 `GET /me`
}
```

`FacebookUser` 常见字段：`id`、`name`、`email?`。

自定义 `onProfile` 时框架已拉好 `userinfo`：

```ts
onProfile: async ({ token, userinfo }) => {
  return upsertUser({ id: userinfo.id /* 或对应字段 */ });
},
```

也可直接：`import { fetchFacebookUser } from '@aomex-contrib/oauth2-facebook'`。

---

## 6. 默认预设

```ts
authorizationEndpoint: 'https://www.facebook.com/v21.0/dialog/oauth';
tokenEndpoint: 'https://graph.facebook.com/v21.0/oauth/access_token';
scopes: ['email', 'public_profile'];
```

升级 Graph 版本时，可覆盖上述两个端点 URL 中的版本号。

---

## 7. 常见问题

**Q: URL Blocked / 重定向 URI 无效？**  
A: 「有效 OAuth 重定向 URI」必须包含与 `redirectUri` 完全相同的地址；本地需 https 公网域名。

**Q: 开发模式只有自己能登？**  
A: 正常。把账号加为测试用户/开发者，或完成应用上线。

**Q: 没有 email？**  
A: 检查 scope、权限审核状态，以及用户是否拒绝了 email。

---

通用能力见：https://aomex.js.org
