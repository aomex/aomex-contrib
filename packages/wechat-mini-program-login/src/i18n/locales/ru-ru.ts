import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ru-RU */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId не должен быть пустым',
  app_secret_empty: 'appSecret не должен быть пустым',
  store_empty: 'store must not be empty',
  js_code_empty: 'jsCode не должен быть пустым',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'Сбой WeChat code2session: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
