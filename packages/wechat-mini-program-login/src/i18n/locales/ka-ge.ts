import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ka-GE */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId არ უნდა იყოს ცარიელი',
  app_secret_empty: 'appSecret არ უნდა იყოს ცარიელი',
  store_empty: 'store must not be empty',
  js_code_empty: 'jsCode არ უნდა იყოს ცარიელი',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session ვერ მოხერხდა: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
