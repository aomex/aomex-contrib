import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** el-GR */
export default I18n.satisfies(zh).define({
  app_id_empty: 'Το appId δεν πρέπει να είναι κενό',
  app_secret_empty: 'Το appSecret δεν πρέπει να είναι κενό',
  store_empty: 'store must not be empty',
  js_code_empty: 'Το jsCode δεν πρέπει να είναι κενό',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'Το WeChat code2session απέτυχε: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
