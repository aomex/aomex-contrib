import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ru-RU */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Browser не готов или соединение разорвано',
  close_browser_timeout: 'Превышено время закрытия браузера',
  close_browser_failed:
    '[Playwright] Не удалось закрыть, принудительное завершение: {{message}}',
  force_kill_browser: '[Playwright] Процесс Chromium принудительно завершён, pid={{pid}}',
  force_kill_failed: '[Playwright] Не удалось принудительно завершить: {{message}}',
  close_context_timeout: 'Превышено время закрытия Context',
  close_context_failed: '[Playwright] Не удалось закрыть Context: {{message}}',
  xvfb_exited: 'Xvfb завершился, code={{code}}',
  xvfb_start_failed: 'Не удалось запустить Xvfb',
  max_concurrent_invalid: 'maxConcurrent должен быть целым числом >= 1',
});
