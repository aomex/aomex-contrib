import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sv-SE */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Webbläsaren är inte redo eller anslutningen bröts',
  close_browser_timeout: 'Tidsgränsen överskreds när webbläsaren stängdes',
  close_browser_failed:
    '[Playwright] Stängning misslyckades, tvingar avslut: {{message}}',
  force_kill_browser: '[Playwright] Chromium-processen tvångsavslutades, pid={{pid}}',
  force_kill_failed: '[Playwright] Tvångsavslut misslyckades: {{message}}',
  close_context_timeout: 'Tidsgränsen överskreds när Context stängdes',
  close_context_failed: '[Playwright] Context kunde inte stängas: {{message}}',
  xvfb_exited: 'Xvfb avslutades, code={{code}}',
  xvfb_start_failed: 'Xvfb kunde inte startas',
  max_concurrent_invalid: 'maxConcurrent måste vara ett heltal >= 1',
});
