import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hu-HU */
export default I18n.satisfies(zh).define({
  app_id_empty: 'A appId nem lehet üres',
  app_secret_empty: 'A appSecret nem lehet üres',
  js_code_empty: 'A jsCode nem lehet üres',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session sikertelen: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
