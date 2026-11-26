import { combineServices, internalDestroyServices } from '@aomex/common';
import { Logger } from '@aomex/logger';
import { afterEach, expect, test } from 'vitest';
import { createPlaywrightService } from '../src';

afterEach(async () => {
  await internalDestroyServices([]);
});

/**
 * 对照旧 Puppeteer：`page.setCookie` 对 SameSite=None 会话 Cookie 易写丢，
 * 业务侧曾改走 CDP Network.setCookies。这里验证 Playwright `context.addCookies` 是否够用。
 */
test('withPage addCookies 可写入 SameSite=None 会话 Cookie', async () => {
  const services = await combineServices({
    browser: async () =>
      createPlaywrightService({
        logger: new Logger(),
        stealth: false,
        headless: true,
      }),
  });

  const cookies = await services.browser.withPage(
    {
      cookies: [
        {
          name: 'sid',
          value: 'session-value',
          domain: 'example.com',
          path: '/',
          secure: true,
          httpOnly: true,
          sameSite: 'None',
          expires: -1,
        },
        {
          name: 'persist',
          value: '1',
          domain: 'example.com',
          path: '/',
          secure: true,
          httpOnly: false,
          sameSite: 'None',
          expires: Math.floor(Date.now() / 1000) + 3600,
        },
      ],
    },
    async (_page, context) => context.cookies('https://example.com/'),
  );

  const sid = cookies.find((c) => c.name === 'sid');
  const persist = cookies.find((c) => c.name === 'persist');

  expect(sid).toMatchObject({
    name: 'sid',
    value: 'session-value',
    domain: 'example.com',
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'None',
  });
  expect(sid?.expires).toBe(-1);

  expect(persist).toMatchObject({
    name: 'persist',
    value: '1',
    sameSite: 'None',
    secure: true,
  });
  expect(persist!.expires).toBeGreaterThan(Math.floor(Date.now() / 1000));
});
