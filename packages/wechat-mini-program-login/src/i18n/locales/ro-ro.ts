import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ro-RO */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId nu trebuie să fie gol',
  app_secret_empty: 'appSecret nu trebuie să fie gol',
  store_empty: 'store must not be empty',
  js_code_empty: 'jsCode nu trebuie să fie gol',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session a eșuat: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
