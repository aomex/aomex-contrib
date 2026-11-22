import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hi-IN */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId खाली नहीं होना चाहिए',
  app_secret_empty: 'appSecret खाली नहीं होना चाहिए',
  store_empty: 'store must not be empty',
  js_code_empty: 'jsCode खाली नहीं होना चाहिए',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session विफल: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
