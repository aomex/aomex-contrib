import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** gl-ES */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId non pode estar baleiro',
  app_secret_empty: 'appSecret non pode estar baleiro',
  js_code_empty: 'jsCode non pode estar baleiro',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'Fallou WeChat code2session: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
