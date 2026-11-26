import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** kn-IN */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] ಬ್ರೌಸರ್ ಸಿದ್ಧವಾಗಿಲ್ಲ ಅಥವಾ ಸಂಪರ್ಕ ಕಡಿತವಾಗಿದೆ',
  close_browser_timeout: 'ಬ್ರೌಸರ್ ಮುಚ್ಚುವಾಗ ಸಮಯ ಮೀರಿದೆ',
  close_browser_failed: '[Playwright] ಮುಚ್ಚಲು ವಿಫಲ, ಬಲವಂತವಾಗಿ ನಿಲ್ಲಿಸಲಾಗುತ್ತಿದೆ: {{message}}',
  force_kill_browser: '[Playwright] Chromium ಪ್ರಕ್ರಿಯೆಯನ್ನು ಬಲವಂತವಾಗಿ ನಿಲ್ಲಿಸಲಾಗಿದೆ pid={{pid}}',
  force_kill_failed: '[Playwright] ಬಲವಂತವಾಗಿ ನಿಲ್ಲಿಸುವುದು ವಿಫಲವಾಗಿದೆ: {{message}}',
  close_context_timeout: 'Context ಮುಚ್ಚುವಾಗ ಸಮಯ ಮೀರಿದೆ',
  close_context_failed: '[Playwright] Context ಮುಚ್ಚಲು ವಿಫಲ: {{message}}',
  xvfb_exited: 'Xvfb ನಿರ್ಗಮಿಸಿದೆ, code={{code}}',
  xvfb_start_failed: 'Xvfb ಪ್ರಾರಂಭಿಸಲು ವಿಫಲವಾಗಿದೆ',
  max_concurrent_invalid: 'maxConcurrent 1 ಅಥವಾ ಹೆಚ್ಚಿನ ಪೂರ್ಣಾಂಕವಾಗಿರಬೇಕು',
});
