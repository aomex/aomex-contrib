import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** tk-TM */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId boş bolmaly däl',
  app_secret_empty: 'appSecret boş bolmaly däl',
  js_code_empty: 'jsCode boş bolmaly däl',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session şowsuz: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
