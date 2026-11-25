import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sr-RS */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Прегледач није спреман или је веза прекинута',
  close_browser_timeout: 'Истекло је време при затварању прегледача',
  close_browser_failed:
    '[Playwright] Затварање није успело, принудно заустављање: {{message}}',
  force_kill_browser: '[Playwright] Процес Chromium је принудно заустављен, pid={{pid}}',
  force_kill_failed: '[Playwright] Принудно заустављање није успело: {{message}}',
  close_context_timeout: 'Истекло је време при затварању Context',
  close_context_failed: '[Playwright] Context није могуће затворити: {{message}}',
  xvfb_exited: 'Xvfb је завршио, code={{code}}',
  xvfb_start_failed: 'Xvfb није могуће покренути',
  max_concurrent_invalid: 'maxConcurrent мора бити цео број >= 1',
});
