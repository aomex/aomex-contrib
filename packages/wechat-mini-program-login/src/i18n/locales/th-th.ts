import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** th-TH */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ต้องไม่ว่างเปล่า',
  app_secret_empty: 'appSecret ต้องไม่ว่างเปล่า',
  js_code_empty: 'jsCode ต้องไม่ว่างเปล่า',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session ล้มเหลว: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
