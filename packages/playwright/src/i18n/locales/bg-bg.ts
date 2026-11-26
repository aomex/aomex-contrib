import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** bg-BG */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Браузърът не е готов или връзката е прекъсната',
  close_browser_timeout: 'Времето за затваряне на браузъра изтече',
  close_browser_failed:
    '[Playwright] Затварянето не успя, принудително спиране: {{message}}',
  force_kill_browser:
    '[Playwright] Процесът на Chromium е принудително спрян, pid={{pid}}',
  force_kill_failed: '[Playwright] Принудителното спиране не успя: {{message}}',
  close_context_timeout: 'Времето за затваряне на Context изтече',
  close_context_failed: '[Playwright] Context не можа да се затвори: {{message}}',
  xvfb_exited: 'Xvfb приключи, code={{code}}',
  xvfb_start_failed: 'Xvfb не можа да се стартира',
  max_concurrent_invalid: 'maxConcurrent трябва да е цяло число >= 1',
});
