# @aomex-contrib/oauth2-apple

**Sign in with Apple**（OIDC）客户端：

- 默认 `response_mode=form_post`（回调参数在 **POST body**，不是 query）
- 用 Team ID + Key ID + `.p8` **动态签发 JWT** 当作 `client_secret`（无需也不该在后台抄一长串固定 secret）
- 省略 `onProfile` 时，`callback` 返回 `{ claims, user }`（`claims` 为已验签 `id_token`；`user` 为 form_post 姓名等，仅首次可能非 null）

官方文档：[Authenticating users with Sign in with Apple](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api/authenticating_users_with_sign_in_with_apple)、[Creating a client secret](https://developer.apple.com/documentation/accountorganizationaldatasharing/creating-a-client-secret)。

---

## 1. 安装

```bash
pnpm add @aomex-contrib/oauth2-apple @aomex/oauth2-client
```

（包内会用到 `jose` 签 JWT，随本包依赖安装即可。）

---

## 2. Apple Developer 后台准备（按顺序）

### 2.1 会员与 Identifiers

1. 登录 [Apple Developer](https://developer.apple.com/account) → Certificates, Identifiers & Profiles
2. 记下右上角 **Team ID**（10 位）
3. Identifiers → 若还没有 App ID：创建 App ID，勾选 **Sign In with Apple**
4. Identifiers → 「+」→ **Services IDs** → 创建（这是 Web 登录用的 **clientId**，形如 `com.example.web`）
5. 编辑该 Services ID：勾选 Sign In with Apple → Configure：
   - Domains and Subdomains：填 `example.com`（不要协议）
   - Return URLs：填完整回调，如 `https://example.com/oauth/apple/callback`

### 2.2 密钥 .p8

1. Keys → 「+」→ 勾选 **Sign In with Apple** → Configure 关联到你的 App ID
2. 注册后**立刻下载** `AuthKey_XXXXX.p8`（只下载一次）
3. 记下该 Key 的 **Key ID**

| 你需要的值     | 用在哪里                    |
| -------------- | --------------------------- |
| Team ID        | `teamId`                    |
| Services ID    | `clientId`                  |
| Key ID         | `keyId`                     |
| `.p8` 文件内容 | `privateKey`                |
| Return URL     | `redirectUri`（须完全一致） |

`.p8` 当机密保管，不要提交 git。

---

## 3. 回调必须是 POST（form_post）

Apple 默认把 `code` / `state` / `user`（仅首次可能有）POST 到你的 `redirectUri`。

因此：

1. 回调路由必须能接收 **POST**（且框架要解析 `application/x-www-form-urlencoded` body）
2. 本包重写了 `readCallbackInput`：**优先读 body**，缺省再回退 query
3. 不要指望只用 GET `?code=` 调试 Apple Web 登录

首次授权时 Apple 可能在 body 里额外带 `user`（JSON 字符串，含姓名）；本包会解析进默认 profile 的 `user` 字段。**之后回调多为 `user: null`，务必在首次落库。**

---

## 4. store

用于 `state`。生产多实例用 Redis 等共享存储。

---

## 5. 最小可跑通示例

```ts
import { readFileSync } from 'node:fs';
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { AppleOAuth2Client } from '@aomex-contrib/oauth2-apple';

const apple = new AppleOAuth2Client({
  clientId: process.env.APPLE_CLIENT_ID!, // Services ID
  teamId: process.env.APPLE_TEAM_ID!,
  keyId: process.env.APPLE_KEY_ID!,
  privateKey: readFileSync(process.env.APPLE_PRIVATE_KEY_PATH!, 'utf8'),
  // 也可传入已 importPKCS8 的密钥对象
  redirectUri: 'https://example.com/oauth/apple/callback',
  store: new CacheMemoryAdapter(),
  // 默认 scopes: openid email name
  // clientSecretExpiresIn 默认约 6 个月（Apple 上限附近）
});

router.get('/oauth/apple', {
  action: async (ctx) => {
    await apple.redirect(ctx);
  },
});

// 注意：POST
router.post('/oauth/apple/callback', {
  action: async (ctx) => {
    const profile = await apple.callback(ctx);
    // profile.claims.sub；profile.user 仅首次可能有 name
    ctx.send(profile);
  },
});
```

---

## 6. 默认返回什么

`AppleProfile`：

| 字段     | 含义                                                                                                      |
| -------- | --------------------------------------------------------------------------------------------------------- |
| `claims` | 已验签的 `id_token`（`sub` / `email` / `is_private_email` 等）                                            |
| `user`   | form_post 解析的 `{ email?, name?: { firstName?, lastName? } }`；**仅首次授权可能非 null**，之后为 `null` |

```ts
onProfile: async ({ oidc, user }) =>
  findOrCreateUser({
    appleSub: oidc.claims.sub,
    email: oidc.claims.email,
    name: user?.name,
  }),
```

---

## 7. client_secret 怎么来的

每次换票前，本包用 ES256 签一个 JWT：

- `iss` = Team ID
- `sub` = Services ID（clientId）
- `aud` = `https://appleid.apple.com`
- `kid` = Key ID
- 有效期默认 `15777000` 秒（约 6 个月），可用 `clientSecretExpiresIn` 调整

你**不需要**也不应该在构造参数里传静态 `clientSecret`。

---

## 8. 常见问题

**Q: invalid_client？**  
A: 检查 Team ID / Key ID / Services ID / `.p8` 是否匹配；Services ID 是否已启用 Sign In with Apple 且 Return URL 一致。

**Q: 回调 404 或读不到 code？**  
A: 路由必须是 POST；确认 body parser 已启用；本包从 body 取 `code`/`state`。

**Q: 第二次登录没有名字？**  
A: Apple 设计如此。首次务必把 name 存下来，或引导用户在设置里撤销 App 后再授权一次（仅用于调试）。

**Q: 本地怎么测？**  
A: 需要公网 https + 已登记域名；用内网穿透，并把域名配进 Domains / Return URLs。

---

通用能力见：https://aomex.js.org
