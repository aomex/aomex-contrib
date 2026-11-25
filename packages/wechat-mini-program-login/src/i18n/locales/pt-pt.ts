import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** pt-PT */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId não pode estar vazio',
  app_secret_empty: 'appSecret não pode estar vazio',
  js_code_empty: 'jsCode não pode estar vazio',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'Falha no WeChat code2session: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
