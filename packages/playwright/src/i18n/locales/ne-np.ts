import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ne-NP */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] ब्राउजर तयार छैन वा जडान टुटेको छ',
  close_browser_timeout: 'ब्राउजर बन्द गर्दा समय सकियो',
  close_browser_failed: '[Playwright] बन्द गर्न असफल, जबर्जस्ती बन्द गरिँदै: {{message}}',
  force_kill_browser: '[Playwright] Chromium प्रक्रिया जबर्जस्ती बन्द गरियो pid={{pid}}',
  force_kill_failed: '[Playwright] जबर्जस्ती बन्द गर्न असफल: {{message}}',
  close_context_timeout: 'Context बन्द गर्दा समय सकियो',
  close_context_failed: '[Playwright] Context बन्द गर्न असफल: {{message}}',
  xvfb_exited: 'Xvfb बाहिरियो, code={{code}}',
  xvfb_start_failed: 'Xvfb सुरु गर्न असफल',
  max_concurrent_invalid: 'maxConcurrent 1 वा सोभन्दा ठूलो पूर्णाङ्क हुनुपर्छ',
});
