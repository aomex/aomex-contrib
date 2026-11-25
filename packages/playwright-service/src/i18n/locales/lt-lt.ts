import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** lt-LT */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Naršyklė neparuošta arba ryšys nutrūko',
  close_browser_timeout: 'Baigėsi laikas uždarant naršyklę',
  close_browser_failed:
    '[Playwright] Uždaryti nepavyko, priverstinai stabdoma: {{message}}',
  force_kill_browser:
    '[Playwright] Chromium procesas priverstinai sustabdytas, pid={{pid}}',
  force_kill_failed: '[Playwright] Priverstinis stabdymas nepavyko: {{message}}',
  close_context_timeout: 'Baigėsi laikas uždarant Context',
  close_context_failed: '[Playwright] Context uždaryti nepavyko: {{message}}',
  xvfb_exited: 'Xvfb baigė darbą, code={{code}}',
  xvfb_start_failed: 'Xvfb paleisti nepavyko',
  max_concurrent_invalid: 'maxConcurrent turi būti sveikasis skaičius >= 1',
});
