import { parseDuration, Service, sleep } from '@aomex/common';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import {
  chromium as vanillaChromium,
  type Browser,
  type BrowserContext,
} from 'playwright';
import { addExtra } from 'playwright-extra';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { i18n } from './i18n';
import type {
  CreatePlaywrightServiceOptions,
  PlaywrightPage,
  PlaywrightServiceStats,
  PlaywrightViewport,
  RecaptchaOptions,
  WithPageOptions,
} from './types';
import { chromeUserAgentFromVersion, toPlaywrightProxy } from './utils';

const DEFAULT_VIEWPORT: PlaywrightViewport = { width: 1400, height: 800 };

const DEFAULT_LAUNCH_ARGS = [
  '--lang=en-US,en',
  '--disable-blink-features=AutomationControlled',
  '--disable-gpu',
  '--disable-dev-shm-usage',
  '--disable-setuid-sandbox',
  '--no-sandbox',
  '--disable-infobars',
  '--no-first-run',
  '--no-zygote',
];

/** `createPlaywrightService` 返回类的实例公开 API */
export type PlaywrightService<HasRecaptcha extends boolean = false> = Service & {
  withPage<T>(
    opts: WithPageOptions,
    onHandle: (page: PlaywrightPage<HasRecaptcha>, context: BrowserContext) => Promise<T>,
  ): Promise<T>;
  getStats(): PlaywrightServiceStats;
};

export type PlaywrightServiceCtor<HasRecaptcha extends boolean = false> =
  new () => PlaywrightService<HasRecaptcha>;

/**
 * 创建 Playwright Browser Service 子类。
 *
 * - `onInit`：启动唯一 Chromium 进程（默认经 playwright-extra + stealth）
 * - `withPage`：每次新建带代理的 `BrowserContext` + `Page`，用完关闭 Context
 * - `getStats`：并发占用与 Browser 连接状态
 * - `idleTimeout`：空闲且无进行中任务时关闭 Browser；下次 `withPage` 再启
 * - `maxConcurrent`：同时进行的 `withPage` 上限，超出排队
 * - `recaptcha`：可选挂载 recaptcha 插件；传入后 `withPage` 的 page 类型带解题方法
 * - `onDestroy`：关闭进程；超时则强杀
 *
 * 站点点击流等业务逻辑请放在业务 Service，不要塞进本类。
 */
export function createPlaywrightService(
  opts: CreatePlaywrightServiceOptions & { recaptcha: RecaptchaOptions },
): PlaywrightServiceCtor<true>;
export function createPlaywrightService(
  opts: CreatePlaywrightServiceOptions,
): PlaywrightServiceCtor<false>;
export function createPlaywrightService(
  opts: CreatePlaywrightServiceOptions,
): PlaywrightServiceCtor<boolean> {
  const headless = opts.headless ?? true;
  const stealth = opts.stealth ?? true;
  const viewport = opts.viewport ?? DEFAULT_VIEWPORT;
  const timezoneId = opts.timezoneId ?? 'America/New_York';
  const locale = opts.locale ?? 'en-US';
  const defaultTimeoutMs = parseDuration(opts.defaultTimeout ?? '2 minutes');
  const closeTimeoutMs = parseDuration(opts.closeTimeout ?? '10 seconds');
  const idleTimeoutMs = parseDuration(opts.idleTimeout);
  const maxConcurrent = opts.maxConcurrent;
  if (maxConcurrent != null && (!Number.isInteger(maxConcurrent) || maxConcurrent < 1)) {
    throw new Error(i18n.t('max_concurrent_invalid'));
  }
  // 每次工厂调用独立 launcher，避免多次 create 时往全局 chromium 重复挂插件
  const chromium = addExtra(vanillaChromium);
  if (stealth) {
    chromium.use(StealthPlugin());
  }
  if (opts.recaptcha) {
    chromium.use(RecaptchaPlugin(opts.recaptcha));
  }

  return class PlaywrightService extends Service {
    protected _browser: Browser | null = null;
    /** 进行中的 `withPage` 数量；>0 时禁止 idle 关闭 */
    protected _active = 0;
    /** `maxConcurrent` 排队等待者 */
    protected _waiters: Array<() => void> = [];
    protected _idleTimer: ReturnType<typeof setTimeout> | null = null;
    /** close / launch 互斥队列 */
    protected _mutex: Promise<unknown> = Promise.resolve();
    /** 是否已调用 `onDestroy`；避免多次重复关闭 */
    protected _destroyed = false;

    protected override async onInit(): Promise<void> {
      if (!headless) {
        await this.ensureDisplay();
      }
      await this.runExclusive(async () => {
        this._browser = await this.launchBrowser();
      });
      this.scheduleIdleClose();
    }

    protected override async onDestroy(): Promise<void> {
      this._destroyed = true;
      this.clearIdleTimer();
      this.wakeAllWaiters();
      await this.runExclusive(async () => {
        await this.closeBrowser();
      });
    }

    protected runExclusive<T>(fn: () => Promise<T>): Promise<T> {
      const run = this._mutex.then(fn, fn);
      this._mutex = run.then(
        () => undefined,
        () => undefined,
      );
      return run;
    }

    protected async launchBrowser(): Promise<Browser> {
      const { args: extraArgs, ...launchRest } = opts.launch ?? {};
      return chromium.launch({
        headless,
        ignoreDefaultArgs: ['--enable-automation'],
        ...launchRest,
        args: [
          ...DEFAULT_LAUNCH_ARGS,
          `--window-size=${viewport.width},${viewport.height}`,
          ...(extraArgs ?? []),
        ],
      });
    }

    /**
     * 占用一个并发名额（`_active++`）；达到 `maxConcurrent` 时排队。
     */
    protected async acquireSlot(): Promise<void> {
      for (;;) {
        if (this._destroyed) {
          throw new Error(i18n.t('browser_not_ready'));
        }
        if (maxConcurrent == null || this._active < maxConcurrent) {
          this._active += 1;
          this.clearIdleTimer();
          return;
        }
        await new Promise<void>((resolve) => {
          this._waiters.push(resolve);
        });
      }
    }

    protected releaseSlot(): void {
      this._active = Math.max(0, this._active - 1);
      const next = this._waiters.shift();
      next?.();
      if (this._active === 0) {
        this.scheduleIdleClose();
      }
    }

    protected wakeAllWaiters(): void {
      const waiters = this._waiters.splice(0);
      for (const wake of waiters) wake();
    }

    /**
     * 确保 Browser 可用（互斥）；idle 关闭或断开后会重新 launch。
     */
    protected async ensureBrowser(): Promise<Browser> {
      return this.runExclusive(async () => {
        if (this._destroyed) {
          throw new Error(i18n.t('browser_not_ready'));
        }
        this.clearIdleTimer();
        if (!this._browser?.isConnected()) {
          this._browser = await this.launchBrowser();
        }
        return this.requireBrowser();
      });
    }

    protected clearIdleTimer(): void {
      if (this._idleTimer) {
        clearTimeout(this._idleTimer);
        this._idleTimer = null;
      }
    }

    protected scheduleIdleClose(): void {
      if (idleTimeoutMs == null || this._destroyed) return;
      this.clearIdleTimer();
      this._idleTimer = setTimeout(() => {
        void this.runExclusive(async () => {
          if (this._destroyed || this._active > 0 || !this._browser) return;
          await this.closeBrowser();
        });
      }, idleTimeoutMs);
      this._idleTimer.unref?.();
    }

    /**
     * 在已启动的 Browser 上开 Context/Page 执行任务；结束后关闭 Page+Context，**不**关 Browser。
     * （若配置了 `idleTimeout` 且随后空闲，会异步关闭 Browser）
     */
    async withPage<T>(
      pageOpts: WithPageOptions,
      onHandle: (page: PlaywrightPage<boolean>, context: BrowserContext) => Promise<T>,
    ): Promise<T> {
      await this.acquireSlot();
      try {
        const browser = await this.ensureBrowser();
        const { proxy: proxyOpt, cookies, ...contextOpts } = pageOpts;
        const proxy = toPlaywrightProxy(proxyOpt);

        const context = await browser.newContext({
          viewport,
          locale,
          timezoneId,
          ignoreHTTPSErrors: true,
          userAgent: opts.userAgent ?? chromeUserAgentFromVersion(browser.version()),
          ...contextOpts,
          ...(proxy ? { proxy } : null),
        });

        context.setDefaultTimeout(defaultTimeoutMs);
        context.setDefaultNavigationTimeout(defaultTimeoutMs);

        if (cookies?.length) {
          await context.addCookies(cookies);
        }

        const page = await context.newPage();

        try {
          return await onHandle(page as PlaywrightPage<boolean>, context);
        } finally {
          await this.closeContextQuietly(context);
        }
      } finally {
        this.releaseSlot();
      }
    }

    /** 当前并发占用与 Browser 连接状态 */
    getStats(): PlaywrightServiceStats {
      return {
        active: this._active,
        waiting: this._waiters.length,
        connected: !!this._browser?.isConnected(),
      };
    }

    /** 关闭 Browser，超时则强杀。调用方需已持有互斥（或确认无并发）。 */
    protected async closeBrowser(): Promise<void> {
      const browser = this._browser;
      if (!browser) return;

      this._browser = null;
      try {
        await Promise.race([
          browser.close(),
          sleep(closeTimeoutMs).then(() => {
            throw new Error(i18n.t('close_browser_timeout'));
          }),
        ]);
      } catch (error) {
        this.warn(
          i18n.t('close_browser_failed', {
            message: (error as Error).message,
          }),
        );
        this.forceKillBrowser(browser);
      }
    }

    protected requireBrowser(): Browser {
      const browser = this._browser;
      if (!browser?.isConnected()) {
        throw new Error(i18n.t('browser_not_ready'));
      }
      return browser;
    }

    protected warn(message: string): void {
      opts.logger.warn(message);
    }

    /**
     * Linux 无头服务器上跑有界面 Chromium 时，若无 `DISPLAY` 则尝试启动 Xvfb。
     * 需镜像已安装 `xvfb`。
     */
    protected async ensureDisplay(): Promise<void> {
      if (process.env['DISPLAY'] || process.platform !== 'linux') return;

      const XVFB_DISPLAY_NUM = 99;
      const display = `:${XVFB_DISPLAY_NUM}`;
      const socketPath = path.join(tmpdir(), '.X11-unix', `X${XVFB_DISPLAY_NUM}`);

      if (existsSync(socketPath)) {
        process.env['DISPLAY'] = display;
        return;
      }

      const { width, height } = viewport;
      const xvfb = spawn(
        'Xvfb',
        [display, '-screen', '0', `${width}x${height}x24`, '-nolisten', 'tcp'],
        { stdio: 'ignore' },
      );

      await new Promise<void>((resolve, reject) => {
        xvfb.once('error', reject);
        xvfb.once('exit', (code) => {
          if (code !== null && code !== 0) {
            reject(new Error(i18n.t('xvfb_exited', { code: String(code) })));
          }
        });

        const waitReady = async () => {
          for (let i = 0; i < 40; i++) {
            if (existsSync(socketPath)) {
              process.env['DISPLAY'] = display;
              resolve();
              return;
            }
            await sleep(50);
          }
          reject(new Error(i18n.t('xvfb_start_failed')));
        };

        void waitReady();
      });
    }

    protected forceKillBrowser(browser: Browser): void {
      try {
        // playwright 类型上 Browser.process 偶发缺失；运行时 chromium.launch 实例有此方法
        const proc = (
          browser as Browser & {
            process?: () => {
              kill: (signal?: NodeJS.Signals) => boolean;
              killed?: boolean;
              pid?: number;
            } | null;
          }
        ).process?.();
        if (proc && !proc.killed) {
          proc.kill('SIGKILL');
          this.warn(i18n.t('force_kill_browser', { pid: String(proc.pid ?? '') }));
        }
      } catch (error) {
        this.warn(i18n.t('force_kill_failed', { message: (error as Error).message }));
      }
    }

    protected async closeContextQuietly(context: BrowserContext): Promise<void> {
      try {
        await Promise.race([
          context.close(),
          sleep(closeTimeoutMs).then(() => {
            throw new Error(i18n.t('close_context_timeout'));
          }),
        ]);
      } catch (error) {
        this.warn(
          i18n.t('close_context_failed', {
            message: (error as Error).message,
          }),
        );
      }
    }
  } as PlaywrightServiceCtor<boolean>;
}
