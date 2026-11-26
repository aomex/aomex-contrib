import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** be-BY */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Browser не гатовы або злучэнне разарвана',
  close_browser_timeout: 'Перавышаны час закрыцця браўзера',
  close_browser_failed:
    '[Playwright] Не ўдалося закрыць, прымусовае завяршэнне: {{message}}',
  force_kill_browser: '[Playwright] Працэс Chromium прымусова завяршоны, pid={{pid}}',
  force_kill_failed: '[Playwright] Не ўдалося прымусова завяршыць: {{message}}',
  close_context_timeout: 'Перавышаны час закрыцця Context',
  close_context_failed: '[Playwright] Не ўдалося закрыць Context: {{message}}',
  xvfb_exited: 'Xvfb завяршыўся, code={{code}}',
  xvfb_start_failed: 'Не ўдалося запусціць Xvfb',
  max_concurrent_invalid: 'maxConcurrent павінен быць цэлым лікам >= 1',
});
