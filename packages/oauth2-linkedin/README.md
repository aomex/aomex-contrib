# @aomex-contrib/oauth2-linkedin

LinkedIn OAuth2（OpenID Connect 产品形态）登录预设。默认 `callback` 拉取 [`GET /v2/userinfo`](https://learn.microsoft.com/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2)，返回 `{ base, userinfo }`。

官方文档：[Authorization Code Flow](https://learn.microsoft.com/linkedin/shared/authentication/authorization-code-flow)。

---

## 1. 安装

```bash
pnpm add @aomex-contrib/oauth2-linkedin @aomex/oauth2-client
```

---

## 2. LinkedIn 后台准备

1. 打开 [LinkedIn Developers](https://www.linkedin.com/developers/apps) → Create app
2. Auth 选项卡：
   - 复制 **Client ID**、**Client Secret**
   - Authorized redirect URLs for your app：添加  
     `https://example.com/oauth/linkedin/callback`
3. Products：申请 / 启用 **Sign In with LinkedIn using OpenID Connect**（名称以控制台为准）
4. 确认 OAuth scopes 含 `openid`、`profile`、`email`（本包默认）

| 环境变量建议             | 对应          |
| ------------------------ | ------------- |
| `LINKEDIN_CLIENT_ID`     | Client ID     |
| `LINKEDIN_CLIENT_SECRET` | Client Secret |

---

## 3. store

保存 OAuth `state`。生产用共享 Redis。

---

## 4. 最小可跑通示例

```ts
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { LinkedInOAuth2Client } from '@aomex-contrib/oauth2-linkedin';

const linkedin = new LinkedInOAuth2Client({
  clientId: process.env.LINKEDIN_CLIENT_ID!,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
  redirectUri: 'https://example.com/oauth/linkedin/callback',
  store: new CacheMemoryAdapter(),
  // 默认 scopes: openid, profile, email
});

router.get('/oauth/linkedin', {
  action: async (ctx) => {
    await linkedin.redirect(ctx);
  },
});

router.get('/oauth/linkedin/callback', {
  action: async (ctx) => {
    const profile = await linkedin.callback(ctx);
    // profile.base = 令牌；profile.userinfo = LinkedInUser
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
  userinfo: LinkedInUser; // 来自 `GET /v2/userinfo`
}
```

`LinkedInUser` 常见字段：`sub`、`name`、`given_name`、`family_name`、`picture`、`email`、`email_verified`。

自定义 `onProfile` 时框架已拉好 `userinfo`：

```ts
onProfile: async ({ token, userinfo }) => {
  return upsertUser({ id: userinfo.id /* 或对应字段 */ });
},
```

也可直接：`import { fetchLinkedInUser } from '@aomex-contrib/oauth2-linkedin'`。

---

## 6. 默认预设

```ts
authorizationEndpoint: 'https://www.linkedin.com/oauth/v2/authorization';
tokenEndpoint: 'https://www.linkedin.com/oauth/v2/accessToken';
revocationEndpoint: 'https://www.linkedin.com/oauth/v2/revoke';
scopes: ['openid', 'profile', 'email'];
```

---

## 7. 常见问题

**Q: unauthorized_scope_error / 产品未开通？**  
A: 在 App 的 Products 里启用 Sign In with LinkedIn (OIDC)，并等待审核通过（若需要）。

**Q: redirect_uri 不匹配？**  
A: Auth 页 Authorized redirect URLs 必须包含完整回调地址。

---

通用能力见：https://aomex.js.org
