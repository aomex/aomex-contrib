import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** nl-NL */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Browser is niet gereed of de verbinding is verbroken',
  close_browser_timeout: 'Time-out bij het sluiten van de browser',
  close_browser_failed: '[Playwright] Sluiten mislukt, geforceerd stoppen: {{message}}',
  force_kill_browser: '[Playwright] Chromium-proces geforceerd gestopt, pid={{pid}}',
  force_kill_failed: '[Playwright] Geforceerd stoppen mislukt: {{message}}',
  close_context_timeout: 'Time-out bij het sluiten van Context',
  close_context_failed: '[Playwright] Context sluiten mislukt: {{message}}',
  xvfb_exited: 'Xvfb is gestopt, code={{code}}',
  xvfb_start_failed: 'Xvfb starten mislukt',
  max_concurrent_invalid: 'maxConcurrent moet een geheel getal >= 1 zijn',
});
