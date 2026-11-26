import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sl-SI */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Brskalnik ni pripravljen ali je povezava prekinjena',
  close_browser_timeout: 'Čas za zapiranje brskalnika je potekel',
  close_browser_failed:
    '[Playwright] Zapiranje ni uspelo, vsiljena zaustavitev: {{message}}',
  force_kill_browser:
    '[Playwright] Proces Chromium je bil vsiljeno ustavljen, pid={{pid}}',
  force_kill_failed: '[Playwright] Vsiljena zaustavitev ni uspela: {{message}}',
  close_context_timeout: 'Čas za zapiranje Context je potekel',
  close_context_failed: '[Playwright] Contexta ni bilo mogoče zapreti: {{message}}',
  xvfb_exited: 'Xvfb se je končal, code={{code}}',
  xvfb_start_failed: 'Xvfb ni bilo mogoče zagnati',
  max_concurrent_invalid: 'maxConcurrent mora biti celo število >= 1',
});
