import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** be-BY */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId не павінен быць пустым',
  app_secret_empty: 'appSecret не павінен быць пустым',
  store_empty: 'store must not be empty',
  js_code_empty: 'jsCode не павінен быць пустым',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'Збой WeChat code2session: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
