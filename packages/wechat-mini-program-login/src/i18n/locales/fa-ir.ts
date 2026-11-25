import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** fa-IR */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId نباید خالی باشد',
  app_secret_empty: 'appSecret نباید خالی باشد',
  js_code_empty: 'jsCode نباید خالی باشد',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session ناموفق بود: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
