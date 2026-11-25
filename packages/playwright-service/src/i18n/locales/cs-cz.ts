import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** cs-CZ */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Prohlížeč není připraven nebo bylo spojení přerušeno',
  close_browser_timeout: 'Vypršel čas při zavírání prohlížeče',
  close_browser_failed:
    '[Playwright] Zavření selhalo, následuje vynucené ukončení: {{message}}',
  force_kill_browser: '[Playwright] Proces Chromium byl vynuceně ukončen, pid={{pid}}',
  force_kill_failed: '[Playwright] Vynucené ukončení selhalo: {{message}}',
  close_context_timeout: 'Vypršel čas při zavírání Context',
  close_context_failed: '[Playwright] Context se nepodařilo zavřít: {{message}}',
  xvfb_exited: 'Xvfb skončil, code={{code}}',
  xvfb_start_failed: 'Xvfb se nepodařilo spustit',
  max_concurrent_invalid: 'maxConcurrent musí být celé číslo >= 1',
});
