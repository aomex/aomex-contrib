import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** uk-UA */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Browser не готовий або з’єднання розірвано',
  close_browser_timeout: 'Час очікування закриття браузера вичерпано',
  close_browser_failed:
    '[Playwright] Не вдалося закрити, примусове завершення: {{message}}',
  force_kill_browser: '[Playwright] Процес Chromium примусово завершено, pid={{pid}}',
  force_kill_failed: '[Playwright] Примусове завершення не вдалося: {{message}}',
  close_context_timeout: 'Час очікування закриття Context вичерпано',
  close_context_failed: '[Playwright] Не вдалося закрити Context: {{message}}',
  xvfb_exited: 'Xvfb завершився, code={{code}}',
  xvfb_start_failed: 'Не вдалося запустити Xvfb',
  max_concurrent_invalid: 'maxConcurrent має бути цілим числом >= 1',
});
