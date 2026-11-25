import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hr-HR */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Preglednik nije spreman ili je veza prekinuta',
  close_browser_timeout: 'Isteklo je vrijeme pri zatvaranju preglednika',
  close_browser_failed:
    '[Playwright] Zatvaranje nije uspjelo, prisilno gašenje: {{message}}',
  force_kill_browser: '[Playwright] Proces Chromium prisilno je završen, pid={{pid}}',
  force_kill_failed: '[Playwright] Prisilno gašenje nije uspjelo: {{message}}',
  close_context_timeout: 'Isteklo je vrijeme pri zatvaranju Contexta',
  close_context_failed: '[Playwright] Context nije moguće zatvoriti: {{message}}',
  xvfb_exited: 'Xvfb je završio, code={{code}}',
  xvfb_start_failed: 'Xvfb nije moguće pokrenuti',
  max_concurrent_invalid: 'maxConcurrent mora biti cijeli broj >= 1',
});
