import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** fr-FR */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ne doit pas être vide',
  app_secret_empty: 'appSecret ne doit pas être vide',
  js_code_empty: 'jsCode ne doit pas être vide',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'Échec de WeChat code2session : {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
