import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ur-PK */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] براؤزر تیار نہیں یا کنکشن منقطع ہو گیا',
  close_browser_timeout: 'براؤزر بند کرتے وقت وقت ختم ہو گیا',
  close_browser_failed:
    '[Playwright] بند کرنا ناکام، زبردستی روکا جا رہا ہے: {{message}}',
  force_kill_browser: '[Playwright] Chromium عمل زبردستی روک دیا گیا pid={{pid}}',
  force_kill_failed: '[Playwright] زبردستی روکنا ناکام: {{message}}',
  close_context_timeout: 'Context بند کرتے وقت وقت ختم ہو گیا',
  close_context_failed: '[Playwright] Context بند کرنا ناکام: {{message}}',
  xvfb_exited: 'Xvfb بند ہوا، code={{code}}',
  xvfb_start_failed: 'Xvfb شروع نہیں ہو سکا',
  max_concurrent_invalid: 'maxConcurrent 1 یا اس سے بڑا عدد صحیح ہونا چاہیے',
});
