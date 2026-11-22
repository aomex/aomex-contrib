import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ga-IE */
export default I18n.satisfies(zh).define({
  app_id_empty: 'Ní féidir appId a bheith folamh',
  app_secret_empty: 'Ní féidir appSecret a bheith folamh',
  store_empty: 'store must not be empty',
  js_code_empty: 'Ní féidir jsCode a bheith folamh',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'Theip ar WeChat code2session: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
