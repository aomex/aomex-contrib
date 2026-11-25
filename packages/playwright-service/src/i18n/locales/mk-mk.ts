import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** mk-MK */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Прелистувачот не е подготвен или врската е прекината',
  close_browser_timeout: 'Истече времето при затворање на прелистувачот',
  close_browser_failed:
    '[Playwright] Затворањето не успеа, принудно запирање: {{message}}',
  force_kill_browser: '[Playwright] Процесот Chromium е принудно запрен, pid={{pid}}',
  force_kill_failed: '[Playwright] Принудното запирање не успеа: {{message}}',
  close_context_timeout: 'Истече времето при затворање на Context',
  close_context_failed: '[Playwright] Context не може да се затвори: {{message}}',
  xvfb_exited: 'Xvfb заврши, code={{code}}',
  xvfb_start_failed: 'Xvfb не може да се стартува',
  max_concurrent_invalid: 'maxConcurrent мора да биде цел број >= 1',
});
