import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** is-IS */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId má ekki vera autt',
  app_secret_empty: 'appSecret má ekki vera autt',
  js_code_empty: 'jsCode má ekki vera autt',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session mistókst: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
