import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** he-IL */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] הדפדפן אינו מוכן או שהחיבור נותק',
  close_browser_timeout: 'תם הזמן בעת סגירת הדפדפן',
  close_browser_failed: '[Playwright] הסגירה נכשלה, מתבצע סיום כפוי: {{message}}',
  force_kill_browser: '[Playwright] תהליך Chromium הסתיים בכפייה pid={{pid}}',
  force_kill_failed: '[Playwright] הסיום הכפוי נכשל: {{message}}',
  close_context_timeout: 'תם הזמן בעת סגירת Context',
  close_context_failed: '[Playwright] סגירת Context נכשלה: {{message}}',
  xvfb_exited: 'Xvfb יצא, code={{code}}',
  xvfb_start_failed: 'הפעלת Xvfb נכשלה',
  max_concurrent_invalid: 'maxConcurrent חייב להיות מספר שלם >= 1',
});
