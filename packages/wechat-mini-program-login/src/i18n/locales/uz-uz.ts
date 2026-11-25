import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** uz-UZ */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId bo‘sh bo‘lmasligi kerak',
  app_secret_empty: 'appSecret bo‘sh bo‘lmasligi kerak',
  js_code_empty: 'jsCode bo‘sh bo‘lmasligi kerak',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session muvaffaqiyatsiz: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
