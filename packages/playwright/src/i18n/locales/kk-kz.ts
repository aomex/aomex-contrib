import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** kk-KZ */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Браузер дайын емес немесе байланыс үзілді',
  close_browser_timeout: 'Браузерді жабу уақыты аяқталды',
  close_browser_failed: '[Playwright] Жабу сәтсіз, мәжбүрлеп тоқтатылады: {{message}}',
  force_kill_browser: '[Playwright] Chromium процесі мәжбүрлеп тоқтатылды pid={{pid}}',
  force_kill_failed: '[Playwright] Мәжбүрлеп тоқтату сәтсіз: {{message}}',
  close_context_timeout: 'Context жабу уақыты аяқталды',
  close_context_failed: '[Playwright] Context жабылмады: {{message}}',
  xvfb_exited: 'Xvfb аяқталды, code={{code}}',
  xvfb_start_failed: 'Xvfb іске қосылмады',
  max_concurrent_invalid: 'maxConcurrent >= 1 бүтін сан болуы керек',
});
