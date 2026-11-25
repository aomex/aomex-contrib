# @aomex-contrib/playwright-service

基于 [Playwright](https://playwright.dev) 的 aomex **Browser Service**：`onInit` 启动唯一 Chromium，每次任务用独立 `BrowserContext` 注入代理。默认经 [playwright-extra](https://github.com/berstend/puppeteer-extra/tree/master/packages/playwright-extra) + [puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth) 做反自动化。

适合：业务里多处要开浏览器、按账号/任务换代理、retry 时复用同一 Browser。

---

## 安装浏览器

`pnpm add` 只装 npm 包，不会下载 Chromium。把下面两段 script 加到**业务项目**的 `package.json`：

```json
{
  "scripts": {
    "postinstall": "playwright install chromium",
    "install:browser:deps": "playwright install --with-deps chromium"
  }
}
```

`postinstall` 会在每次 `pnpm install` 时下载 Chromium 二进制，本地和线上安装依赖都会执行。它不装系统库，macOS 上可以直接跑。

`install:browser:deps` 还会走 apt 安装系统库，需要 root，只在 Docker 镜像构建时执行。

本包运行时要求 **Node >= 24**。`playwright` 版本必须和项目依赖一致，否则找不到浏览器可执行文件。

### 本地

```bash
pnpm add @aomex-contrib/playwright-service playwright
```

### Docker：官方 Node 镜像

生产 / CI 用 Docker Hub 官方 [`node`](https://hub.docker.com/_/node) 镜像（`node:24`），在**镜像构建**时安装 Chromium 和系统库。Playwright 文档也支持这种做法（见 [Build your own image](https://playwright.dev/docs/docker#build-your-own-image)）。

镜像里的 `pnpm install` 会跑 `postinstall`，只下载浏览器。系统库用 `pnpm install:browser:deps` 补上。

```dockerfile
FROM node:24

WORKDIR /app

RUN pnpm install:browser:deps

CMD ["node", "dist/index.js"]
```

要点：

- 基础镜像用官方默认 tag `node:24`（当前是 Debian）；Alpine / musl **不支持** Playwright 的 Firefox/WebKit 构建，本包默认 Chromium 也请避开 Alpine
- 镜像内以 `root` 跑时 Chromium sandbox 常被关掉；爬不受信站点时建议另建非 root 用户，并参考 Playwright 的 [seccomp](https://playwright.dev/docs/docker) 说明
- 也可用 Microsoft 预装镜像 `mcr.microsoft.com/playwright:v<与依赖相同的版本>-jammy`（或 `-noble`），但仍需自行安装 `playwright` npm 包，且 tag 版本必须对齐

Docker 默认把容器里的 `/dev/shm` 限制在 64MB。Chromium 每个页面是独立进程，渲染数据走这块共享内存，空间不够时页面会崩。加大空间是**启动容器**的参数，写不进 Dockerfile。

```bash
docker run --shm-size=1g your-image
```

Compose 写在服务上：

```yaml
services:
  app:
    shm_size: 1g
```

### 有界面（`headless: false`）时加 Xvfb

默认 `headless: true` 即可。若必须有头模式，在 **Linux 无 `DISPLAY`** 时本会自动拉起 `Xvfb :99`，但镜像里要先有 `Xvfb` 命令：

```dockerfile
FROM node:24

RUN apt-get update \
  && apt-get install -y --no-install-recommends xvfb \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN pnpm install:browser:deps

CMD ["node", "dist/index.js"]
```

```ts
createPlaywrightService({ logger, headless: false });
```

- 已设置有效 `DISPLAY` 时不会再起 Xvfb
- macOS / Windows 本机有显示子系统，不走这套逻辑

---

## 注册

```ts
// src/services/browser.service.ts
import { createPlaywrightService } from '@aomex-contrib/playwright-service';
import { Logger } from '@aomex/logger';

export default createPlaywrightService({
  logger: new Logger(), // 或项目里已有的 Logger 实例
  // headless: false, // 有界面；Linux 无 DISPLAY 时镜像需已装 xvfb（见上文）
  // stealth: false,
  // idleTimeout: '5 minutes',
  // maxConcurrent: 3,
  // recaptcha: {
  //   provider: { id: '2captcha', token: process.env.TWOCAPTCHA_TOKEN! },
  // },
});

// src/services/index.ts
export const services = await combineServices({
  browser: () => import('./browser.service.js'),
  // ...
});
```

不要在 `services/index` 里直接 `import` 并内联 `createPlaywrightService(...)`：

```ts
// ❌ 入口一加载就会拉起 Playwright / stealth 等依赖，进程一开始就多占内存
import { createPlaywrightService } from '@aomex-contrib/playwright-service';
browser: async () => createPlaywrightService({ logger, headless: true }),
```

应像上文一样 `() => import('./browser.service.js')`，等第一次用到 browser 再加载。

### 继承扩展方法

`createPlaywrightService` 返回的是 class，可 `extends` 后加业务方法（内部继续调 `withPage`）：

```ts
// src/services/browser.service.ts
import {
  createPlaywrightService,
  type WithPageOptions,
} from '@aomex-contrib/playwright-service';
import { Logger } from '@aomex/logger';
import type { BrowserContext, Page } from 'playwright';

const PlaywrightService = createPlaywrightService({
  logger: new Logger(),
});

export default class BrowserService extends PlaywrightService {
  /** 失败时截图后原样抛出；各业务 Service 复用，不要把站点流程写进来 */
  async withPageOrScreenshot<T>(
    opts: WithPageOptions,
    onHandle: (page: Page, context: BrowserContext) => Promise<T>,
  ): Promise<T> {
    return this.withPage(opts, async (page, context) => {
      try {
        return await onHandle(page, context);
      } catch (error) {
        await page.screenshot({ path: `failed-${Date.now()}.png`, fullPage: true });
        throw error;
      }
    });
  }

  /** 打开 URL 并返回页面 HTML */
  async getHtml(url: string, opts: WithPageOptions = {}) {
    return this.withPage(opts, async (page) => {
      await page.goto(url);
      return page.content();
    });
  }
}
```

公开 API：`withPage`、`getStats`。继承类**只放通用、可跨业务复用的方法**；具体站点点击流、账号流程仍放在各自业务 Service。

---

## 用法

```ts
const proxy = {
  host: '1.2.3.4',
  port: 8080,
  username: 'u',
  password: 'p',
};

const cookies = await services.browser.withPage(
  {
    proxy,
    cookies: savedCookies,
    // storageState / extraHTTPHeaders / userAgent / geolocation / permissions ...
  },
  async (page, context) => {
    await page.goto('https://example.com/login');
    // 若配置了 recaptcha：
    // await page.solveRecaptchas();
    return context.cookies();
  },
);
```

`WithPageOptions`：`proxy`（本包简化结构）、`cookies`（创建后再 `addCookies`），以及 Playwright `BrowserContextOptions` 其余字段（会覆盖 Service 级 `viewport` / `locale` 等默认）。

### 行为说明

| API             | 作用                                                          |
| --------------- | ------------------------------------------------------------- |
| `onInit`        | 首次用到 Service 时 `chromium.launch`                         |
| `withPage`      | `newContext({ proxy })` → `newPage` → 回调 → **关闭 Context** |
| `getStats`      | `{ active, waiting, connected }` 并发与连接状态               |
| `idleTimeout`   | 空闲回收 Browser（省内存）；下次 `withPage` 自动再启          |
| `maxConcurrent` | 同时 `withPage` 上限；超出排队                                |
| `onDestroy`     | 关 Browser；超时强杀进程                                      |

代理：`proxy.server` 或 `proxy.host` + `proxy.port`；账密写在 `proxy.username` / `proxy.password`。

---

## 配置项

`createPlaywrightService({ ... })`：

| 字段             | 说明                                                            | 默认                           |
| ---------------- | --------------------------------------------------------------- | ------------------------------ |
| `headless`       | 是否无头；`false` 时 Linux 无 DISPLAY 会自动起 Xvfb（需已安装） | `true`                         |
| `stealth`        | 是否挂载 `puppeteer-extra-plugin-stealth`                       | `true`                         |
| `recaptcha`      | 挂载 `puppeteer-extra-plugin-recaptcha` 的选项                  | —（不传则不挂）                |
| `viewport`       | 视口                                                            | `{ width: 1400, height: 800 }` |
| `timezoneId`     | Context 时区                                                    | `'America/New_York'`           |
| `locale`         | Context 语言                                                    | `'en-US'`                      |
| `defaultTimeout` | Context 默认超时（`DurationInput`）                             | `'2 minutes'`                  |
| `closeTimeout`   | 关闭 Browser/Context 等待上限                                   | `'10 seconds'`                 |
| `idleTimeout`    | 空闲回收 Browser（省内存）；再有任务会自动 launch               | —                              |
| `maxConcurrent`  | 同时 `withPage` 上限；超出排队；不传则不限制                    | —                              |
| `launch`         | `chromium.launch` 选项；`args` 追加在默认列表后                 | —                              |
| `logger`         | **必填**，`Logger` 实例（如项目共用 logger）                    | —                              |
| `userAgent`      | 自定义 UA                                                       | 按 Chromium 版本拼 Chrome UA   |

### reCAPTCHA / hCaptcha

配置 `recaptcha` 后，`withPage` 的 `page` 类型会带上 `solveRecaptchas` 等方法（未配置则没有）。打码平台 token、何时解题仍由业务决定：

```ts
await services.browser.withPage({}, async (page) => {
  await page.goto('https://www.google.com/recaptcha/api2/demo');
  await page.solveRecaptchas();
});
```

站点专用点击流放在**业务 Service**。

---

通用能力见：https://aomex.js.org
