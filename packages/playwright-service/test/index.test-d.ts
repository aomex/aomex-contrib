import { expectType, type TypeEqual } from 'ts-expect';
import type { Logger } from '@aomex/logger';
import {
  createPlaywrightService,
  type PlaywrightPage,
  type PlaywrightService,
} from '../src';

declare const logger: Logger;

const withoutRecaptcha = createPlaywrightService({ logger });
expectType<TypeEqual<PlaywrightService<false>, InstanceType<typeof withoutRecaptcha>>>(
  true,
);

const withRecaptcha = createPlaywrightService({
  logger,
  recaptcha: {
    provider: { id: '2captcha', token: 'x' },
  },
});
expectType<TypeEqual<PlaywrightService<true>, InstanceType<typeof withRecaptcha>>>(true);

// @ts-expect-error logger 必填
createPlaywrightService({});

declare const off: PlaywrightService<false>;
declare const on: PlaywrightService<true>;

void off.withPage({}, async (page) => {
  expectType<TypeEqual<PlaywrightPage<false>, typeof page>>(true);
  // @ts-expect-error 未启用 recaptcha 时解题方法为 never
  await page.solveRecaptchas();
  return null;
});

void on.withPage({}, async (page) => {
  expectType<TypeEqual<PlaywrightPage<true>, typeof page>>(true);
  await page.solveRecaptchas();
  return null;
});
