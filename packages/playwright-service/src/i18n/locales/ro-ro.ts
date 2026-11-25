import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ro-RO */
export default I18n.satisfies(zh).define({
  browser_not_ready:
    '[Playwright] Browserul nu este pregătit sau conexiunea s-a întrerupt',
  close_browser_timeout: 'Timpul a expirat la închiderea browserului',
  close_browser_failed: '[Playwright] Închiderea a eșuat, oprire forțată: {{message}}',
  force_kill_browser: '[Playwright] Procesul Chromium a fost oprit forțat, pid={{pid}}',
  force_kill_failed: '[Playwright] Oprirea forțată a eșuat: {{message}}',
  close_context_timeout: 'Timpul a expirat la închiderea Context',
  close_context_failed: '[Playwright] Închiderea Context a eșuat: {{message}}',
  xvfb_exited: 'Xvfb s-a închis, code={{code}}',
  xvfb_start_failed: 'Pornirea Xvfb a eșuat',
  max_concurrent_invalid: 'maxConcurrent trebuie să fie un număr întreg >= 1',
});
