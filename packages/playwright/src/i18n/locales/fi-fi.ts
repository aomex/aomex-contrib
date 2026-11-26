import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** fi-FI */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Selain ei ole valmis tai yhteys on katkennut',
  close_browser_timeout: 'Selaimen sulkeminen aikakatkaistiin',
  close_browser_failed:
    '[Playwright] Sulkeminen epäonnistui, pakotetaan lopetus: {{message}}',
  force_kill_browser: '[Playwright] Chromium-prosessi pakotettiin loppumaan, pid={{pid}}',
  force_kill_failed: '[Playwright] Pakotettu lopetus epäonnistui: {{message}}',
  close_context_timeout: 'Contextin sulkeminen aikakatkaistiin',
  close_context_failed: '[Playwright] Contextin sulkeminen epäonnistui: {{message}}',
  xvfb_exited: 'Xvfb päättyi, code={{code}}',
  xvfb_start_failed: 'Xvfb:n käynnistys epäonnistui',
  max_concurrent_invalid: 'maxConcurrent on oltava kokonaisluku >= 1',
});
