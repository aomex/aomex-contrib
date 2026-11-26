import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

export const en = I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Browser is not ready or has disconnected',
  close_browser_timeout: 'Timed out while closing browser',
  close_browser_failed:
    '[Playwright] Failed to close browser, force-killing: {{message}}',
  force_kill_browser: '[Playwright] Force-killed Chromium process pid={{pid}}',
  force_kill_failed: '[Playwright] Force-kill failed: {{message}}',
  close_context_timeout: 'Timed out while closing context',
  close_context_failed: '[Playwright] Failed to close context: {{message}}',
  xvfb_exited: 'Xvfb exited with code={{code}}',
  xvfb_start_failed: 'Xvfb failed to start',
  max_concurrent_invalid: 'maxConcurrent must be an integer >= 1',
});
