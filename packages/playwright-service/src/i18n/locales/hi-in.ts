import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hi-IN */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] ब्राउज़र तैयार नहीं है या कनेक्शन टूट गया है',
  close_browser_timeout: 'ब्राउज़र बंद करते समय समय समाप्त',
  close_browser_failed:
    '[Playwright] बंद करना विफल, ज़बरदस्ती बंद किया जा रहा है: {{message}}',
  force_kill_browser: '[Playwright] Chromium प्रक्रिया ज़बरदस्ती बंद की गई pid={{pid}}',
  force_kill_failed: '[Playwright] ज़बरदस्ती बंद करना विफल: {{message}}',
  close_context_timeout: 'Context बंद करते समय समय समाप्त',
  close_context_failed: '[Playwright] Context बंद करना विफल: {{message}}',
  xvfb_exited: 'Xvfb बंद हुआ, code={{code}}',
  xvfb_start_failed: 'Xvfb शुरू नहीं हो सका',
  max_concurrent_invalid: 'maxConcurrent 1 या उससे बड़ा पूर्णांक होना चाहिए',
});
