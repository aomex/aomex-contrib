import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ca-ES */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId no pot estar buit',
  app_secret_empty: 'appSecret no pot estar buit',
  js_code_empty: 'jsCode no pot estar buit',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'Ha fallat WeChat code2session: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
