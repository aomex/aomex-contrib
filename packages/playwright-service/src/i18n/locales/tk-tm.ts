import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** tk-TM */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Brauzer taýýar däl ýa-da birikme kesildi',
  close_browser_timeout: 'Brauzeri ýapmak wagty gutardy',
  close_browser_failed:
    '[Playwright] Ýapmak başa barmady, mejbury duruzulýar: {{message}}',
  force_kill_browser: '[Playwright] Chromium prosesi mejbury duruzyldy pid={{pid}}',
  force_kill_failed: '[Playwright] Mejbury duruzmak başa barmady: {{message}}',
  close_context_timeout: 'Context ýapmak wagty gutardy',
  close_context_failed: '[Playwright] Context ýapylmady: {{message}}',
  xvfb_exited: 'Xvfb çykdy, code={{code}}',
  xvfb_start_failed: 'Xvfb başladylmady',
  max_concurrent_invalid: 'maxConcurrent >= 1 bitin san bolmaly',
});
