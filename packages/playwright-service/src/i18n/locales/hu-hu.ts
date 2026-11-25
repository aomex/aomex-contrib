import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hu-HU */
export default I18n.satisfies(zh).define({
  browser_not_ready:
    '[Playwright] A böngésző nem áll készen, vagy a kapcsolat megszakadt',
  close_browser_timeout: 'Időtúllépés a böngésző bezárásakor',
  close_browser_failed:
    '[Playwright] A bezárás sikertelen, kényszerített leállítás: {{message}}',
  force_kill_browser: '[Playwright] A Chromium folyamat kényszerítve leállt, pid={{pid}}',
  force_kill_failed: '[Playwright] A kényszerített leállítás sikertelen: {{message}}',
  close_context_timeout: 'Időtúllépés a Context bezárásakor',
  close_context_failed: '[Playwright] A Context bezárása sikertelen: {{message}}',
  xvfb_exited: 'Az Xvfb kilépett, code={{code}}',
  xvfb_start_failed: 'Az Xvfb indítása sikertelen',
  max_concurrent_invalid: 'A maxConcurrent értéke >= 1 egész szám kell legyen',
});
