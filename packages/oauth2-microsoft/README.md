# @aomex-contrib/oauth2-microsoft

Microsoft / **Entra ID（Azure AD）OIDC** 登录预设。默认租户为 `common`（个人 Microsoft 账号 + 任意组织目录均可尝试登录）。省略 `onProfile` 时，`callback` 返回**已验签**的 `id_token` claims。

官方文档：[Microsoft identity platform / OIDC](https://learn.microsoft.com/entra/identity-platform/v2-protocols-oidc)。

---

## 1. 安装

```bash
pnpm add @aomex-contrib/oauth2-microsoft @aomex/oauth2-client
```

---

## 2. Entra 后台准备

1. 打开 [Azure 门户](https://portal.azure.com/) →「Microsoft Entra ID」→「应用注册」→「新注册」
2. 名称随意；「受支持的帐户类型」按产品选择：
   - 仅本组织 → 单租户
   - 任意组织目录 → `organizations`
   - 组织 + 个人 MSA → `common`（与本包默认一致）
   - 仅个人 Microsoft 账号 → `consumers`
3. 「重定向 URI」平台选 **Web**，填：  
   `https://example.com/oauth/microsoft/callback`
4. 创建完成后：  
   -「概览」复制 **应用程序（客户端）ID** → `clientId`  
   -「证书和密码」→ 新建客户端密码 → 复制**值**（不是 ID）→ `clientSecret`
5. （可选）「API 权限」确认有 `openid` / `profile` / `email`；`offline_access` 用于 refresh

| 环境变量建议       | 对应                 |
| ------------------ | -------------------- |
| `MS_CLIENT_ID`     | 应用程序（客户端）ID |
| `MS_CLIENT_SECRET` | 客户端密码的「值」   |

---

## 3. 租户 / issuer

本包默认：

```ts
issuer: 'https://login.microsoftonline.com/common/v2.0';
```

若应用是**单租户**，或必须限制为某一目录，请覆盖 `oidc.issuer`：

```ts
import { Caching } from '@aomex/cache';
import { CacheMemoryAdapter } from '@aomex/cache/memory';

const ms = new MicrosoftOAuth2Client({
  clientId: process.env.MS_CLIENT_ID!,
  clientSecret: process.env.MS_CLIENT_SECRET!,
  redirectUri: 'https://example.com/oauth/microsoft/callback',
  store: new Caching(new CacheMemoryAdapter()),
  oidc: {
    // 把 {tenant} 换成你的租户 ID 或域名，例如 contoso.onmicrosoft.com
    issuer: 'https://login.microsoftonline.com/{tenant}/v2.0',
  },
});
```

`common` / `organizations` / `consumers` / 具体 tenant 必须与「应用注册」里帐户类型匹配，否则登录页或验签会失败。

---

## 4. store

保存 OAuth **`state`**（及基类可能用到的 PKCE 数据）。生产多实例请用 Redis 等共享 `Caching`（`new Caching(adapter)`）。

---

## 5. 最小可跑通示例

```ts
import { Caching } from '@aomex/cache';
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { MicrosoftOAuth2Client } from '@aomex-contrib/oauth2-microsoft';

const ms = new MicrosoftOAuth2Client({
  clientId: process.env.MS_CLIENT_ID!,
  clientSecret: process.env.MS_CLIENT_SECRET!,
  redirectUri: 'https://example.com/oauth/microsoft/callback',
  store: new Caching(new CacheMemoryAdapter()),
  // 默认 scopes: openid profile email offline_access
});

router.get('/oauth/microsoft', {
  action: async (ctx) => {
    await ms.redirect(ctx);
  },
});

router.get('/oauth/microsoft/callback', {
  action: async (ctx) => {
    const claims = await ms.callback(ctx);
    // claims.sub / oid / preferred_username / email …
    ctx.send(claims);
  },
});
```

---

## 6. 默认返回什么

`MicrosoftIdTokenClaims` 常见字段：

| 字段                                   | 含义                                |
| -------------------------------------- | ----------------------------------- |
| `sub`                                  | 主体标识                            |
| `oid`                                  | 目录中的对象 ID（常用作稳定用户键） |
| `tid`                                  | 租户 ID                             |
| `preferred_username` / `email` / `upn` | 登录名相关                          |
| `name`                                 | 显示名                              |

```ts
onProfile: async ({ oidc }) =>
  findOrCreateUser({ microsoftOid: oidc.claims.oid ?? oidc.claims.sub }),
```

---

## 7. 默认预设

- issuer：`https://login.microsoftonline.com/common/v2.0`
- scopes：`openid`、`profile`、`email`、`offline_access`

构造时传 `scopes` / `oidc` 等可覆盖。

---

## 8. 常见问题

**Q: AADSTS50011 redirect URI 不匹配？**  
A: 门户里登记的 Web 重定向 URI 必须与代码完全一致。

**Q: 单租户应用却用 common？**  
A: 把 `oidc.issuer` 改成该租户的 `.../{tenantId}/v2.0`。

**Q: 没有 refresh_token？**  
A: 确认 scope 含 `offline_access`，且应用类型 / 权限允许。

---

通用能力见：https://aomex.js.org
