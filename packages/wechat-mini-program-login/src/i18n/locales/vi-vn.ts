import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** vi-VN */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId không được để trống',
  app_secret_empty: 'appSecret không được để trống',
  js_code_empty: 'jsCode không được để trống',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session thất bại: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
