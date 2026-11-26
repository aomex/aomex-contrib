import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** bn-BD */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] ব্রাউজার প্রস্তুত নয় বা সংযোগ বিচ্ছিন্ন হয়েছে',
  close_browser_timeout: 'ব্রাউজার বন্ধ করতে সময় শেষ',
  close_browser_failed: '[Playwright] বন্ধ করা যায়নি, জোর করে বন্ধ করা হচ্ছে: {{message}}',
  force_kill_browser: '[Playwright] Chromium প্রক্রিয়া জোর করে বন্ধ করা হয়েছে pid={{pid}}',
  force_kill_failed: '[Playwright] জোর করে বন্ধ করা যায়নি: {{message}}',
  close_context_timeout: 'Context বন্ধ করতে সময় শেষ',
  close_context_failed: '[Playwright] Context বন্ধ করা যায়নি: {{message}}',
  xvfb_exited: 'Xvfb বন্ধ হয়েছে, code={{code}}',
  xvfb_start_failed: 'Xvfb চালু করা যায়নি',
  max_concurrent_invalid: 'maxConcurrent অবশ্যই 1 বা তার বেশি একটি পূর্ণসংখ্যা হতে হবে',
});
