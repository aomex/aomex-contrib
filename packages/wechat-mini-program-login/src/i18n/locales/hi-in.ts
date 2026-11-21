import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hi-IN */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId खाली नहीं होना चाहिए',
  app_secret_empty: 'appSecret खाली नहीं होना चाहिए',
  js_code_empty: 'jsCode खाली नहीं होना चाहिए',
  code2session_failed: 'WeChat code2session विफल: {{errcode}} {{errmsg}}',
});
