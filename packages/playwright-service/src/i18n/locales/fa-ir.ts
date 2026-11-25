import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** fa-IR */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] مرورگر آماده نیست یا اتصال قطع شده است',
  close_browser_timeout: 'مهلت بستن مرورگر به پایان رسید',
  close_browser_failed: '[Playwright] بستن ناموفق بود، توقف اجباری: {{message}}',
  force_kill_browser: '[Playwright] فرایند Chromium به‌اجبار متوقف شد pid={{pid}}',
  force_kill_failed: '[Playwright] توقف اجباری ناموفق بود: {{message}}',
  close_context_timeout: 'مهلت بستن Context به پایان رسید',
  close_context_failed: '[Playwright] بستن Context ناموفق بود: {{message}}',
  xvfb_exited: 'Xvfb خارج شد، code={{code}}',
  xvfb_start_failed: 'Xvfb راه‌اندازی نشد',
  max_concurrent_invalid: 'maxConcurrent باید عدد صحیحی >= 1 باشد',
});
