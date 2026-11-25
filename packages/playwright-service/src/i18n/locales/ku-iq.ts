import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ku-IQ */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] وێبگەڕ ئامادە نییە یان پەیوەندی پچڕاوە',
  close_browser_timeout: 'کاتی داخستنی وێبگەڕ تەواو بوو',
  close_browser_failed:
    '[Playwright] داخستن سەرکەوتوو نەبوو، بە زۆر دەوەستێت: {{message}}',
  force_kill_browser: '[Playwright] پرۆسەی Chromium بە زۆر وەستا pid={{pid}}',
  force_kill_failed: '[Playwright] وەستاندنی بە زۆر سەرکەوتوو نەبوو: {{message}}',
  close_context_timeout: 'کاتی داخستنی Context تەواو بوو',
  close_context_failed: '[Playwright] داخستنی Context سەرکەوتوو نەبوو: {{message}}',
  xvfb_exited: 'Xvfb دەرچوو، code={{code}}',
  xvfb_start_failed: 'Xvfb دەستپێنەکرا',
  max_concurrent_invalid: 'maxConcurrent دەبێت ژمارەیەکی تەواو بێت >= 1',
});
