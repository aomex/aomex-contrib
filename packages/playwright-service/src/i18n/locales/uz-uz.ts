import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** uz-UZ */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Brauzer tayyor emas yoki ulanish uzildi',
  close_browser_timeout: 'Brauzerni yopish vaqti tugadi',
  close_browser_failed:
    '[Playwright] Yopish muvaffaqiyatsiz, majburan to‘xtatilmoqda: {{message}}',
  force_kill_browser: '[Playwright] Chromium jarayoni majburan to‘xtatildi pid={{pid}}',
  force_kill_failed: '[Playwright] Majburan to‘xtatish muvaffaqiyatsiz: {{message}}',
  close_context_timeout: 'Contextni yopish vaqti tugadi',
  close_context_failed: '[Playwright] Context yopilmadi: {{message}}',
  xvfb_exited: 'Xvfb tugadi, code={{code}}',
  xvfb_start_failed: 'Xvfb ishga tushmadi',
  max_concurrent_invalid: 'maxConcurrent >= 1 butun son bo‘lishi kerak',
});
