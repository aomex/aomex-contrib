import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** tr-TR */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Tarayıcı hazır değil veya bağlantı kesildi',
  close_browser_timeout: 'Tarayıcı kapatılırken zaman aşımı',
  close_browser_failed:
    '[Playwright] Kapatma başarısız, zorla sonlandırılıyor: {{message}}',
  force_kill_browser: '[Playwright] Chromium işlemi zorla sonlandırıldı pid={{pid}}',
  force_kill_failed: '[Playwright] Zorla sonlandırma başarısız: {{message}}',
  close_context_timeout: 'Context kapatılırken zaman aşımı',
  close_context_failed: '[Playwright] Context kapatılamadı: {{message}}',
  xvfb_exited: 'Xvfb çıktı, code={{code}}',
  xvfb_start_failed: 'Xvfb başlatılamadı',
  max_concurrent_invalid: 'maxConcurrent 1 veya daha büyük bir tam sayı olmalıdır',
});
