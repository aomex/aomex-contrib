import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ka-GE */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] ბრაუზერი მზად არ არის ან კავშირი გაწყდა',
  close_browser_timeout: 'ბრაუზერის დახურვის დრო ამოიწურა',
  close_browser_failed:
    '[Playwright] დახურვა ვერ მოხერხდა, იძულებითი შეწყვეტა: {{message}}',
  force_kill_browser: '[Playwright] Chromium-ის პროცესი იძულებით შეწყდა pid={{pid}}',
  force_kill_failed: '[Playwright] იძულებითი შეწყვეტა ვერ მოხერხდა: {{message}}',
  close_context_timeout: 'Context-ის დახურვის დრო ამოიწურა',
  close_context_failed: '[Playwright] Context-ის დახურვა ვერ მოხერხდა: {{message}}',
  xvfb_exited: 'Xvfb დასრულდა, code={{code}}',
  xvfb_start_failed: 'Xvfb-ის გაშვება ვერ მოხერხდა',
  max_concurrent_invalid: 'maxConcurrent უნდა იყოს მთელი რიცხვი >= 1',
});
