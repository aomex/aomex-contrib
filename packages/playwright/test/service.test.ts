import { combineServices, internalDestroyServices, sleep } from '@aomex/common';
import { afterEach, expect, test, vi } from 'vitest';
import type { Browser, BrowserContext, Page } from 'playwright';
import type { Logger } from '@aomex/logger';
import { createPlaywrightService, i18n, type PlaywrightServiceCtor } from '../src';

const logger = { warn: vi.fn() } as unknown as Logger;

afterEach(async () => {
  vi.restoreAllMocks();
  await internalDestroyServices([]);
});

function mockBrowser(overrides?: {
  newContext?: Browser['newContext'];
  close?: () => Promise<void>;
  isConnected?: () => boolean;
}): Browser {
  return {
    isConnected: overrides?.isConnected ?? (() => true),
    version: () => '129.0.0.0',
    newContext: overrides?.newContext ?? (async () => mockContext()),
    close: overrides?.close ?? (async () => {}),
    process: () => null,
  } as unknown as Browser;
}

function mockContext(page: Page = {} as Page): BrowserContext {
  return {
    setDefaultTimeout: vi.fn(),
    setDefaultNavigationTimeout: vi.fn(),
    addCookies: vi.fn(async () => {}),
    newPage: vi.fn(async () => page),
    close: vi.fn(async () => {}),
  } as unknown as BrowserContext;
}

/** 测试注入：spy 受保护的 `launchBrowser`，须在 `combineServices` 之前调用 */
function stubLaunchBrowser(Ctor: PlaywrightServiceCtor, impl: () => Promise<Browser>) {
  return vi
    .spyOn(
      Ctor.prototype as unknown as { launchBrowser: () => Promise<Browser> },
      'launchBrowser',
    )
    .mockImplementation(impl);
}

test('getStats 返回并发与连接状态', async () => {
  const Ctor = createPlaywrightService({ logger, maxConcurrent: 1 });
  stubLaunchBrowser(Ctor, async () => mockBrowser());

  const services = await combineServices({
    browser: async () => Ctor,
  });

  expect(await services.browser.getStats()).toEqual({
    active: 0,
    waiting: 0,
    connected: true,
  });

  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });

  const first = services.browser.withPage({}, async () => {
    await gate;
    return 'ok';
  });
  await sleep(10);
  const second = services.browser.withPage({}, async () => 'queued');
  await sleep(10);

  expect(await services.browser.getStats()).toEqual({
    active: 1,
    waiting: 1,
    connected: true,
  });

  release();
  await Promise.all([first, second]);
});

test('onInit 启动 Browser；多次 withPage 只 launch 一次', async () => {
  const launched: Browser[] = [];
  const Ctor = createPlaywrightService({ logger });
  stubLaunchBrowser(Ctor, async () => {
    const browser = mockBrowser();
    launched.push(browser);
    return browser;
  });

  const services = await combineServices({
    browser: async () => Ctor,
  });

  await services.browser.withPage({}, async () => 'a');
  await services.browser.withPage({}, async () => 'b');
  expect(launched).toHaveLength(1);
});

test('withPage 注入 proxy，结束后关闭 Context', async () => {
  const contextClose = vi.fn(async () => {});
  const newContext = vi.fn(async () => {
    const ctx = mockContext();
    (ctx as unknown as { close: typeof contextClose }).close = contextClose;
    return ctx;
  });

  const Ctor = createPlaywrightService({ logger });
  stubLaunchBrowser(Ctor, async () => mockBrowser({ newContext }));

  const services = await combineServices({
    browser: async () => Ctor,
  });

  const result = await services.browser.withPage(
    {
      proxy: {
        host: '1.2.3.4',
        port: 8080,
        username: 'u',
        password: 'p',
      },
      extraHTTPHeaders: { 'X-Test': '1' },
      userAgent: 'custom-ua',
    },
    async () => 'ok',
  );

  expect(result).toBe('ok');
  expect(newContext).toHaveBeenCalledWith(
    expect.objectContaining({
      proxy: { server: 'http://1.2.3.4:8080', username: 'u', password: 'p' },
      ignoreHTTPSErrors: true,
      extraHTTPHeaders: { 'X-Test': '1' },
      userAgent: 'custom-ua',
    }),
  );
  expect(contextClose).toHaveBeenCalled();
});

test('Browser 断开后 withPage 抛错', async () => {
  const Ctor = createPlaywrightService({ logger });
  stubLaunchBrowser(Ctor, async () => mockBrowser({ isConnected: () => false }));

  const services = await combineServices({
    browser: async () => Ctor,
  });

  await expect(services.browser.withPage({}, async () => 'x')).rejects.toThrow(
    i18n.t('browser_not_ready'),
  );
});

test('idleTimeout 空闲后关闭，再次 withPage 会重新 launch', async () => {
  const launched: Browser[] = [];
  const closed: Browser[] = [];

  const Ctor = createPlaywrightService({ logger, idleTimeout: 40 });
  stubLaunchBrowser(Ctor, async () => {
    const browser = mockBrowser({
      close: async () => {
        closed.push(browser);
      },
    });
    launched.push(browser);
    return browser;
  });

  const services = await combineServices({
    browser: async () => Ctor,
  });

  await services.browser.withPage({}, async () => 'a');
  expect(launched).toHaveLength(1);

  await sleep(80);
  expect(closed).toHaveLength(1);

  await services.browser.withPage({}, async () => 'b');
  expect(launched).toHaveLength(2);
});

test('withPage 进行中不会被 idleTimeout 关掉', async () => {
  const launched: Browser[] = [];
  const closed: Browser[] = [];

  const Ctor = createPlaywrightService({ logger, idleTimeout: 30 });
  stubLaunchBrowser(Ctor, async () => {
    const browser = mockBrowser({
      close: async () => {
        closed.push(browser);
      },
    });
    launched.push(browser);
    return browser;
  });

  const services = await combineServices({
    browser: async () => Ctor,
  });

  const result = await services.browser.withPage({}, async () => {
    await sleep(80);
    return 'ok';
  });

  expect(result).toBe('ok');
  expect(launched).toHaveLength(1);
  expect(closed).toHaveLength(0);
});

test('maxConcurrent 限制同时 withPage 数量，超出排队', async () => {
  let concurrent = 0;
  let maxSeen = 0;

  const Ctor = createPlaywrightService({ logger, maxConcurrent: 2 });
  stubLaunchBrowser(Ctor, async () => mockBrowser());

  const services = await combineServices({
    browser: async () => Ctor,
  });

  const run = () =>
    services.browser.withPage({}, async () => {
      concurrent += 1;
      maxSeen = Math.max(maxSeen, concurrent);
      await sleep(40);
      concurrent -= 1;
      return 'ok';
    });

  await Promise.all([run(), run(), run(), run()]);
  expect(maxSeen).toBe(2);
});

test('maxConcurrent 非法值抛错', () => {
  expect(() => createPlaywrightService({ logger, maxConcurrent: 0 })).toThrow(
    i18n.t('max_concurrent_invalid'),
  );
  expect(() => createPlaywrightService({ logger, maxConcurrent: 1.5 })).toThrow(
    i18n.t('max_concurrent_invalid'),
  );
});
