import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** km-KH */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] កម្មវិធីរុករកមិនទាន់រួចរាល់ ឬការតភ្ជាប់បានផ្តាច់',
  close_browser_timeout: 'អស់ពេលពេលបិទកម្មវិធីរុករក',
  close_browser_failed: '[Playwright] បិទមិនបាន កំពុងបង្ខំបញ្ឈប់៖ {{message}}',
  force_kill_browser: '[Playwright] បានបង្ខំបញ្ឈប់ដំណើរការ Chromium pid={{pid}}',
  force_kill_failed: '[Playwright] ការបង្ខំបញ្ឈប់បរាជ័យ៖ {{message}}',
  close_context_timeout: 'អស់ពេលពេលបិទ Context',
  close_context_failed: '[Playwright] បិទ Context មិនបាន៖ {{message}}',
  xvfb_exited: 'Xvfb បានចេញ code={{code}}',
  xvfb_start_failed: 'ចាប់ផ្តើម Xvfb មិនបាន',
  max_concurrent_invalid: 'maxConcurrent ត្រូវតែជាចំនួនគត់ >= 1',
});
