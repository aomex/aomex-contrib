import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** da-DK */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Browseren er ikke klar eller forbindelsen er afbrudt',
  close_browser_timeout: 'Timeout under lukning af browseren',
  close_browser_failed:
    '[Playwright] Lukning mislykkedes, gennemtvinger afslutning: {{message}}',
  force_kill_browser: '[Playwright] Chromium-processen blev tvangsafsluttet, pid={{pid}}',
  force_kill_failed: '[Playwright] Tvangsafslutning mislykkedes: {{message}}',
  close_context_timeout: 'Timeout under lukning af Context',
  close_context_failed: '[Playwright] Context kunne ikke lukkes: {{message}}',
  xvfb_exited: 'Xvfb afsluttede, code={{code}}',
  xvfb_start_failed: 'Xvfb kunne ikke startes',
  max_concurrent_invalid: 'maxConcurrent skal være et heltal >= 1',
});
