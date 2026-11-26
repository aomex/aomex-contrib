import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** kmr-IQ */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Gerok amade nîne an girêdan qut bûye',
  close_browser_timeout: 'Dema girtina gerokê qediya',
  close_browser_failed:
    '[Playwright] Girtin bi ser neket, bi zorê tê rawestandin: {{message}}',
  force_kill_browser:
    '[Playwright] Pêvajoya Chromium bi zorê hat rawestandin pid={{pid}}',
  force_kill_failed: '[Playwright] Rawestandina bi zorê bi ser neket: {{message}}',
  close_context_timeout: 'Dema girtina Context qediya',
  close_context_failed: '[Playwright] Context nehat girtin: {{message}}',
  xvfb_exited: 'Xvfb derket, code={{code}}',
  xvfb_start_failed: 'Xvfb dest pê nekir',
  max_concurrent_invalid: 'maxConcurrent divê hejmarek temam >= 1 be',
});
