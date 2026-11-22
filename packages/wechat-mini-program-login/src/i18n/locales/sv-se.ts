import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sv-SE */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId får inte vara tomt',
  app_secret_empty: 'appSecret får inte vara tomt',
  store_empty: 'store must not be empty',
  js_code_empty: 'jsCode får inte vara tomt',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session misslyckades: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
