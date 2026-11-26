import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sk-SK */
export default I18n.satisfies(zh).define({
  browser_not_ready:
    '[Playwright] Prehliadač nie je pripravený alebo spojenie bolo prerušené',
  close_browser_timeout: 'Vypršal čas pri zatváraní prehliadača',
  close_browser_failed:
    '[Playwright] Zatvorenie zlyhalo, nasleduje vynútené ukončenie: {{message}}',
  force_kill_browser: '[Playwright] Proces Chromium bol vynútene ukončený, pid={{pid}}',
  force_kill_failed: '[Playwright] Vynútené ukončenie zlyhalo: {{message}}',
  close_context_timeout: 'Vypršal čas pri zatváraní Context',
  close_context_failed: '[Playwright] Context sa nepodarilo zatvoriť: {{message}}',
  xvfb_exited: 'Xvfb skončil, code={{code}}',
  xvfb_start_failed: 'Xvfb sa nepodarilo spustiť',
  max_concurrent_invalid: 'maxConcurrent musí byť celé číslo >= 1',
});
