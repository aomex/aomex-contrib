# @aomex-contrib/oauth2-google

Google **OIDC** 登录预设（**整页 redirect** 授权码）：端点与默认 scope 已填好；省略 `onProfile` 时，`callback` 返回**已验签**的 `id_token` claims。

若前端用 [`@react-oauth/google`](https://www.npmjs.com/package/@react-oauth/google) / GIS 控件拿 `credential`，请用 [`@aomex-contrib/google-identity-login`](../google-identity-login/README.md)，不要用本包。

官方文档：[OpenID Connect](https://developers.google.com/identity/openid-connect/openid-connect)。

---

## 1. 安装

```bash
pnpm add @aomex-contrib/oauth2-google @aomex/oauth2-client
```

---

## 2. Google Cloud 后台准备

1. 打开 [Google Cloud Console](https://console.cloud.google.com/) →「API 和服务」→「凭据」
2. 「创建凭据」→「OAuth 客户端 ID」→ 应用类型选 **Web 应用**
3. 「已授权的重定向 URI」里添加完整回调，例如：  
   `https://example.com/oauth/google/callback`  
   （必须 https；本地可用内网穿透域名）
4. 若尚未配置 OAuth 同意屏幕：选 External / Internal，填应用名、测试用户（External 测试模式需要）
5. 记下 **客户端 ID**、**客户端密钥**

| 环境变量建议           | 对应       |
| ---------------------- | ---------- |
| `GOOGLE_CLIENT_ID`     | 客户端 ID  |
| `GOOGLE_CLIENT_SECRET` | 客户端密钥 |

---

## 3. store

用于保存 OAuth / OIDC **`state`（及 PKCE 相关数据，若基类启用）**。

| 环境       | 推荐                             |
| ---------- | -------------------------------- |
| 单机试玩   | `Caching` + `CacheMemoryAdapter` |
| 生产多实例 | Redis 等适配器 + `Caching`       |

---

## 4. 最小可跑通示例

```ts
import { Caching } from '@aomex/cache';
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { GoogleOAuth2Client } from '@aomex-contrib/oauth2-google';

const google = new GoogleOAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: 'https://example.com/oauth/google/callback',
  store: new Caching(new CacheMemoryAdapter()),
  // 默认 scopes: openid email profile
});

router.get('/oauth/google', {
  action: async (ctx) => {
    await google.redirect(ctx);
  },
});

router.get('/oauth/google/callback', {
  action: async (ctx) => {
    // 默认：已验签的 id_token claims（含 sub、email、name 等）
    const claims = await google.callback(ctx);
    // 在此写登录态：session / JWT …
    ctx.send(claims);
  },
});
```

### 流程

1. 用户打开 `/oauth/google` → 302 到 Google 账号选择 / 同意页
2. 同意后回到回调 `?code=&state=`
3. 服务端校验 state → 换票 → 校验 `id_token` → 返回 claims
4. 你自己落库 / 发 session（本包不管登录态）

---

## 5. 默认返回什么

省略 `onProfile` 时，类型大致为 `GoogleIdTokenClaims`（在标准 OIDC claims 上扩展），常见字段：

| 字段                                              | 含义                                     |
| ------------------------------------------------- | ---------------------------------------- |
| `sub`                                             | Google 用户稳定 ID（建议当主键）         |
| `email`                                           | 邮箱（需 `email` scope）                 |
| `email_verified`                                  | 是否已验证                               |
| `name` / `given_name` / `family_name` / `picture` | 资料（需 `profile`）                     |
| `hd`                                              | Workspace 托管域名（G Suite 账号可能有） |
| `at_hash`                                         | access_token 哈希（OIDC）                |

### 映射成业务用户

```ts
const google = new GoogleOAuth2Client({
  // ...必填
  onProfile: async ({ oidc }) => {
    return findOrCreateUser({
      googleSub: oidc.claims.sub,
      email: oidc.claims.email,
    });
  },
});
```

---

## 6. 默认预设（可覆盖）

- issuer：`https://accounts.google.com`
- scopes：`openid`、`email`、`profile`

构造时传 `scopes` / `oidc` / `authorizationParams` 可覆盖。

---

## 7. 常见问题

**Q: redirect_uri_mismatch？**  
A: Cloud Console 里登记的回调必须与代码里 `redirectUri` **逐字符一致**（含 https、路径、有无尾斜杠）。

**Q: 拿不到 email？**  
A: 确认 scope 含 `email`；同意屏幕若在测试模式，测试用户列表要包含该 Google 账号。

**Q: 多实例 state 失效？**  
A: 换共享 Redis，不要用内存 adapter。

---

通用能力见：https://aomex.js.org
