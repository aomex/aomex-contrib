import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ta-IN */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] உலாவி தயாராக இல்லை அல்லது இணைப்பு துண்டிக்கப்பட்டது',
  close_browser_timeout: 'உலாவியை மூடும்போது நேரம் முடிந்தது',
  close_browser_failed:
    '[Playwright] மூடுதல் தோல்வி, கட்டாயமாக நிறுத்தப்படுகிறது: {{message}}',
  force_kill_browser: '[Playwright] Chromium செயல்முறை கட்டாயமாக நிறுத்தப்பட்டது pid={{pid}}',
  force_kill_failed: '[Playwright] கட்டாய நிறுத்தம் தோல்வி: {{message}}',
  close_context_timeout: 'Context மூடும்போது நேரம் முடிந்தது',
  close_context_failed: '[Playwright] Context மூடுதல் தோல்வி: {{message}}',
  xvfb_exited: 'Xvfb வெளியேறியது, code={{code}}',
  xvfb_start_failed: 'Xvfb தொடங்க முடியவில்லை',
  max_concurrent_invalid: 'maxConcurrent 1 அல்லது அதற்கு மேற்பட்ட முழு எண்ணாக இருக்க வேண்டும்',
});
