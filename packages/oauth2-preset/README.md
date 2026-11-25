# @aomex-contrib/oauth2-preset

OAuth2 / OIDC **厂商预设合并工具**：把「端点 + 默认 scope + 可选 tokenAuth」与用户传入的 `clientId` / `redirectUri` / `store` 等合并成 `@aomex/oauth2-client` 能吃的 options。

供 `@aomex-contrib/oauth2-google`、`oauth2-github` 等包内部使用。**业务应用一般直接依赖具体厂商包即可**，不必安装本包。

---

## 什么时候会用到本包？

| 场景                          | 要不要直接依赖                                    |
| ----------------------------- | ------------------------------------------------- |
| 用 Google / GitHub / … 登录   | ❌ 用对应 `@aomex-contrib/oauth2-*`               |
| 自己写一个新的厂商薄封装      | ✅ 可复用 `mergeOAuth2Preset` / `mergeOidcPreset` |
| 阅读 / 调试厂商包如何叠默认值 | ✅ 看源码即可                                     |

---

## 1. 安装（仅自研厂商包时）

```bash
pnpm add @aomex-contrib/oauth2-preset @aomex/oauth2-client
```

---

## 2. 纯 OAuth2：`mergeOAuth2Preset`

适用于没有 OIDC discovery、靠固定 authorize / token URL 的厂商（GitHub、Discord、Spotify…）。

```ts
import { OAuth2Client } from '@aomex/oauth2-client';
import { mergeOAuth2Preset } from '@aomex-contrib/oauth2-preset';

const myPreset = {
  authorizationEndpoint: 'https://example.com/oauth/authorize',
  tokenEndpoint: 'https://example.com/oauth/token',
  scopes: ['read:user'],
  // revocationEndpoint?: string
  // tokenAuth?: 'body' | 'basic'   // Spotify 类用 basic
  // authorizationParams?: Record<string, string>
} as const;

export class MyOAuth2Client<
  Profile = OAuth2Profile<MyUser>,
> extends OAuth2Client<Profile> {
  constructor(opts: OAuth2VendorOptions<Profile, MyUser>) {
    super(mergeOAuth2Preset(myPreset, opts, fetchMyUser));
  }
}
```

第三个参数是 `fetchUser(accessToken)`：合并层会先拉资料，再：

- 省略 `onProfile` → 返回 `{ base: token, userinfo }`（即 `OAuth2Profile<User>`）
- 自定义 `onProfile` → 入参已带 `userinfo`，不必再自己 fetch

合并规则（要点）：

1. 用户显式传入的 `authorizationEndpoint` / `tokenEndpoint` / `scopes` / `revocationEndpoint` / `tokenAuth` **优先**
2. 未传则用 preset 默认值
3. `authorizationParams`：preset 与用户浅合并（用户覆盖同名键）

导出类型：`OAuth2Profile`、`OAuth2VendorOptions`、`OAuth2VendorOnProfileArgs`、`OAuth2Preset`。

---

## 3. OIDC：`mergeOidcPreset`

适用于 Google / Microsoft 这类靠 `oidc.issuer` 做 discovery、且默认可直接返回已验签 claims 的厂商。

```ts
import { OAuth2Client } from '@aomex/oauth2-client';
import { mergeOidcPreset } from '@aomex-contrib/oauth2-preset';

const myOidc = {
  oidc: { issuer: 'https://accounts.example.com' },
  scopes: ['openid', 'email', 'profile'],
} as const;

export class MyOidcClient extends OAuth2Client {
  constructor(opts: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    store: import('@aomex/cache').Caching;
    // 可覆盖 oidc / scopes …
  }) {
    super(mergeOidcPreset(myOidc, opts) as OAuth2Client.OidcWithoutOnProfileOptions);
  }
}
```

合并规则（要点）：

1. `oidc`：preset 与用户 `Partial` 合并，**`issuer` 以用户为准，缺省用 preset**
2. `scopes` / `authorizationParams` / `revocationEndpoint` / `tokenAuth` 同 OAuth2 规则
3. **`onProfile` 原样透传**：省略时由 `@aomex/oauth2-client` 在 OIDC 模式下返回已验签 claims（厂商包通常再 overload 构造函数类型）

导出类型：`OidcVendorOptions`、`OidcVendorOptionsWithOnProfile`、`OidcVendorOptionsWithoutOnProfile`、`OidcPreset`。

---

## 4. 和具体厂商包的关系

```text
业务代码
  → @aomex-contrib/oauth2-github（等）
      → mergeOAuth2Preset / mergeOidcPreset（本包）
          → @aomex/oauth2-client
```

Apple 因 `form_post` + 动态 JWT `client_secret`，在 `@aomex-contrib/oauth2-apple` 内手写合并，不强制走本包。

微信 / 企微是非标准换票，各自独立实现，也不使用本包。

---

## 5. 常见问题

**Q: 业务项目要不要装本包？**  
A: 一般不要。装 `@aomex-contrib/oauth2-google` 等即可（它们会声明对本包的依赖）。

**Q: 为什么 OAuth2 合并要强制 `fetchUser`？**  
A: 纯 OAuth2 没有 id_token；缺省用 `fetchUser` 拉资料并返回 `{ base, userinfo }`，自定义 `onProfile` 也能直接用已拉好的 `userinfo`。

**Q: 自建 GitLab 改端点要改本包吗？**  
A: 不用。在 `GitLabOAuth2Client` 构造参数里覆盖端点即可，合并函数会尊重用户传入值。

---

通用 OAuth2 / OIDC 能力见：https://aomex.js.org
