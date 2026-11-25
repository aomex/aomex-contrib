import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ne-NP */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId खाली हुनु हुँदैन',
  app_secret_empty: 'appSecret खाली हुनु हुँदैन',
  js_code_empty: 'jsCode खाली हुनु हुँदैन',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session असफल: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
