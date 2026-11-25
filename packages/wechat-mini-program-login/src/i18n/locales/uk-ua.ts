import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** uk-UA */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId не повинен бути порожнім',
  app_secret_empty: 'appSecret не повинен бути порожнім',
  js_code_empty: 'jsCode не повинен бути порожнім',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'Помилка WeChat code2session: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
