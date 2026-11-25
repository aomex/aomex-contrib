import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** az-AZ */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Brauzer hazır deyil və ya bağlantı kəsilib',
  close_browser_timeout: 'Brauzeri bağlamaq vaxtı bitdi',
  close_browser_failed:
    '[Playwright] Bağlamaq alınmadı, məcburi dayandırılır: {{message}}',
  force_kill_browser: '[Playwright] Chromium prosesi məcburi dayandırıldı pid={{pid}}',
  force_kill_failed: '[Playwright] Məcburi dayandırma alınmadı: {{message}}',
  close_context_timeout: 'Context bağlamaq vaxtı bitdi',
  close_context_failed: '[Playwright] Context bağlanmadı: {{message}}',
  xvfb_exited: 'Xvfb çıxdı, code={{code}}',
  xvfb_start_failed: 'Xvfb işə salına bilmədi',
  max_concurrent_invalid: 'maxConcurrent 1-dən böyük və ya bərabər tam ədəd olmalıdır',
});
