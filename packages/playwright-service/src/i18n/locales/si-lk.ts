import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** si-LK */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] බ්‍රවුසරය සූදානම් නැත හෝ සම්බන්ධතාවය විසන්ධි විය',
  close_browser_timeout: 'බ්‍රවුසරය වසන විට කාලය ඉකුත් විය',
  close_browser_failed: '[Playwright] වැසීම අසාර්ථකයි, බලෙන් නවත්වයි: {{message}}',
  force_kill_browser: '[Playwright] Chromium ක්‍රියාවලිය බලෙන් නැවැත්විණි pid={{pid}}',
  force_kill_failed: '[Playwright] බලෙන් නැවැත්වීම අසාර්ථකයි: {{message}}',
  close_context_timeout: 'Context වසන විට කාලය ඉකුත් විය',
  close_context_failed: '[Playwright] Context වැසීම අසාර්ථකයි: {{message}}',
  xvfb_exited: 'Xvfb ඉවත් විය, code={{code}}',
  xvfb_start_failed: 'Xvfb ආරම්භ කළ නොහැකි විය',
  max_concurrent_invalid: 'maxConcurrent 1 හෝ වැඩි පූර්ණ සංඛ්‍යාවක් විය යුතුය',
});
