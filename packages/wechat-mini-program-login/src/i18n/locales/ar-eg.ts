import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ar-EG */
export default I18n.satisfies(zh).define({
  app_id_empty: 'يجب ألا يكون appId فارغًا',
  app_secret_empty: 'يجب ألا يكون appSecret فارغًا',
  store_empty: 'store must not be empty',
  js_code_empty: 'يجب ألا يكون jsCode فارغًا',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'فشل WeChat code2session: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
