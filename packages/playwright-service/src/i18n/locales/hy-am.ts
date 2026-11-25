import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hy-AM */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Զննարկիչը պատրաստ չէ կամ կապն ընդհատվել է',
  close_browser_timeout: 'Զննարկիչը փակելիս ժամանակը սպառվեց',
  close_browser_failed: '[Playwright] Փակումը ձախողվեց, հարկադիր ավարտ՝ {{message}}',
  force_kill_browser: '[Playwright] Chromium գործընթացը հարկադրաբար ավարտվեց pid={{pid}}',
  force_kill_failed: '[Playwright] Հարկադիր ավարտը ձախողվեց՝ {{message}}',
  close_context_timeout: 'Context-ը փակելիս ժամանակը սպառվեց',
  close_context_failed: '[Playwright] Context-ը փակել չհաջողվեց՝ {{message}}',
  xvfb_exited: 'Xvfb-ն ավարտվեց, code={{code}}',
  xvfb_start_failed: 'Xvfb-ն գործարկել չհաջողվեց',
  max_concurrent_invalid: 'maxConcurrent-ը պետք է լինի >= 1 ամբողջ թիվ',
});
