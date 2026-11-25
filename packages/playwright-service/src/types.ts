import type { DurationInput } from '@aomex/common';
import type { Logger } from '@aomex/logger';
import type { BrowserContextOptions, Cookie, LaunchOptions, Page } from 'playwright';
import type RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import type { RecaptchaPluginPageAdditions } from 'puppeteer-extra-plugin-recaptcha/dist/types.js';

/** `puppeteer-extra-plugin-recaptcha` 配置（传给 `RecaptchaPlugin(...)`） */
export type RecaptchaOptions = NonNullable<Parameters<typeof RecaptchaPlugin>[0]>;

/**
 * 未启用 recaptcha 时抹掉插件 ambient 扩到 `Page` 上的方法。
 * （`import` 该插件会全局扩展 `playwright-core.Page`）
 */
type WithoutRecaptchaMethods = {
  [K in keyof RecaptchaPluginPageAdditions]?: never;
};

/**
 * `withPage` 回调中的 Page。
 * `true`：沿用插件 ambient 扩展；`false`：对应方法为 `never`，不可调用。
 */
export type PlaywrightPage<HasRecaptcha extends boolean = false> =
  HasRecaptcha extends true ? Page : Page & WithoutRecaptchaMethods;

/** `getStats()` 返回值 */
export type PlaywrightServiceStats = {
  /** 进行中的 `withPage` 数量 */
  active: number;
  /** 因 `maxConcurrent` 排队中的数量 */
  waiting: number;
  /** Browser 是否仍连接 */
  connected: boolean;
};

/** 代理：`server` 与 `host`+`port` 二选一 */
export type BrowserProxy = {
  /** 完整代理地址，如 `http://1.2.3.4:8080` / `socks5://...` */
  server?: string;
  /** 主机名或 IP；与 `port` 一起使用 */
  host?: string;
  port?: number;
  username?: string;
  password?: string;
};

/**
 * 单次 `withPage` 选项。
 * 除 `proxy` / `cookies` 外，其余字段与 Playwright `BrowserContextOptions` 对齐，会覆盖 Service 级默认。
 */
export type WithPageOptions = {
  /**
   * 挂在 BrowserContext 上的代理（换代理不必重开 Browser）。
   * 账密直接写在 `proxy.username` / `proxy.password`。
   */
  proxy?: BrowserProxy;
  /**
   * Context 创建后调用 `addCookies`。
   * 若同时传 `storageState`，两者都会生效（先还原 storageState，再追加 cookies）。
   */
  cookies?: Cookie[];
} & Omit<BrowserContextOptions, 'proxy'>;

export type PlaywrightViewport = {
  width: number;
  height: number;
};

export type CreatePlaywrightServiceOptions = {
  /**
   * 是否无头。
   * 设为 `false` 时走有界面 Chromium；在 Linux 且环境变量无 `DISPLAY` 时，
   * Service 会尝试自动拉起 `Xvfb`（需系统已安装，见 README「Docker：官方 Node 镜像」）。
   * 默认值：`true`
   */
  headless?: boolean;
  /**
   * 是否启用 `puppeteer-extra-plugin-stealth`（经 `playwright-extra`）。
   * 默认值：`true`
   */
  stealth?: boolean;
  /**
   * 启用 `puppeteer-extra-plugin-recaptcha`（经 `playwright-extra`）。
   * 传入后可在 `withPage` 回调里调用 `page.solveRecaptchas()`。
   * 不传则不挂载。
   *
   * @example
   * ```ts
   * createPlaywrightService({
   *   logger,
   *   recaptcha: {
   *     provider: { id: '2captcha', token: process.env.TWOCAPTCHA_TOKEN! },
   *   },
   * })
   * ```
   */
  recaptcha?: RecaptchaOptions;
  /** 默认值：`{ width: 1400, height: 800 }` */
  viewport?: PlaywrightViewport;
  /** 默认值：`'America/New_York'` */
  timezoneId?: string;
  /** 默认值：`'en-US'` */
  locale?: string;
  /** Context 默认超时（含导航）。默认值：`2 minutes` */
  defaultTimeout?: DurationInput;
  /** 关闭 Browser / Context 的等待上限。默认值：`10 seconds` */
  closeTimeout?: DurationInput;
  /**
   * 空闲回收：无进行中的 `withPage` 达到该时长后关闭 Browser，降低常驻内存/句柄占用。
   * 关闭不等于停用——之后再有 `withPage` 会自动重新 launch，无需手动启动。
   * 关与开互斥；有任务时不会关。不传则常驻到 `onDestroy`。
   * 例：`'5 minutes'` / `300_000`
   */
  idleTimeout?: DurationInput;
  /**
   * 同时进行的 `withPage` 上限；超出则排队等待。
   * 不传则不限制。
   */
  maxConcurrent?: number;
  /**
   * 传给 `chromium.launch` 的选项（不含 `headless` / `proxy`）。
   * `args` 会追加在内置默认 args 与 `--window-size` 之后。
   */
  launch?: Omit<LaunchOptions, 'headless' | 'proxy'>;
  /**
   * 日志出口（如项目里的 `Logger` 实例 / `services.logger`）。
   */
  logger: Logger;
  /** 自定义 User-Agent。默认值：按 Chromium 版本拼 Chrome UA */
  userAgent?: string;
};
