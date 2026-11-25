import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sl-SI */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ne sme biti prazen',
  app_secret_empty: 'appSecret ne sme biti prazen',
  js_code_empty: 'jsCode ne sme biti prazen',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session ni uspel: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
