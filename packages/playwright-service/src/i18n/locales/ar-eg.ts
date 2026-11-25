import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ar-EG */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] المتصفح غير جاهز أو انقطع الاتصال',
  close_browser_timeout: 'انتهت المهلة أثناء إغلاق المتصفح',
  close_browser_failed: '[Playwright] فشل الإغلاق، سيتم الإنهاء القسري: {{message}}',
  force_kill_browser: '[Playwright] تم إنهاء عملية Chromium قسرًا pid={{pid}}',
  force_kill_failed: '[Playwright] فشل الإنهاء القسري: {{message}}',
  close_context_timeout: 'انتهت المهلة أثناء إغلاق Context',
  close_context_failed: '[Playwright] فشل إغلاق Context: {{message}}',
  xvfb_exited: 'خرج Xvfb، code={{code}}',
  xvfb_start_failed: 'فشل تشغيل Xvfb',
  max_concurrent_invalid: 'يجب أن يكون maxConcurrent عددًا صحيحًا >= 1',
});
