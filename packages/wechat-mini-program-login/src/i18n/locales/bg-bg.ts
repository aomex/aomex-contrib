import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** bg-BG */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId не трябва да е празен',
  app_secret_empty: 'appSecret не трябва да е празен',
  js_code_empty: 'jsCode не трябва да е празен',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session не успя: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
