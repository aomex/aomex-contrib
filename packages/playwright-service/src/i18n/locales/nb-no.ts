import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** nb-NO */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Nettleseren er ikke klar eller tilkoblingen er brutt',
  close_browser_timeout: 'Tidsavbrudd ved lukking av nettleseren',
  close_browser_failed: '[Playwright] Lukking mislyktes, tvungen avslutning: {{message}}',
  force_kill_browser: '[Playwright] Chromium-prosessen ble tvangs avsluttet, pid={{pid}}',
  force_kill_failed: '[Playwright] Tvungen avslutning mislyktes: {{message}}',
  close_context_timeout: 'Tidsavbrudd ved lukking av Context',
  close_context_failed: '[Playwright] Kunne ikke lukke Context: {{message}}',
  xvfb_exited: 'Xvfb avsluttet, code={{code}}',
  xvfb_start_failed: 'Kunne ikke starte Xvfb',
  max_concurrent_invalid: 'maxConcurrent må være et heltall >= 1',
});
