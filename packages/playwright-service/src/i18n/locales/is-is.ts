import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** is-IS */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Vafrinn er ekki tilbúinn eða tengingin rofnaði',
  close_browser_timeout: 'Tími rann út við að loka vafranum',
  close_browser_failed: '[Playwright] Lokun mistókst, þvinguð stöðvun: {{message}}',
  force_kill_browser:
    '[Playwright] Chromium-ferli var stöðvað nauðungarlega, pid={{pid}}',
  force_kill_failed: '[Playwright] Þvinguð stöðvun mistókst: {{message}}',
  close_context_timeout: 'Tími rann út við að loka Context',
  close_context_failed: '[Playwright] Tókst ekki að loka Context: {{message}}',
  xvfb_exited: 'Xvfb hætti, code={{code}}',
  xvfb_start_failed: 'Ekki tókst að ræsa Xvfb',
  max_concurrent_invalid: 'maxConcurrent verður að vera heiltala >= 1',
});
