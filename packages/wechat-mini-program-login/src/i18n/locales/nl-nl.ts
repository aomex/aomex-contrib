import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** nl-NL */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId mag niet leeg zijn',
  app_secret_empty: 'appSecret mag niet leeg zijn',
  js_code_empty: 'jsCode mag niet leeg zijn',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session mislukt: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
