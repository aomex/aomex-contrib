import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** kk-KZ */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId бос болмауы керек',
  app_secret_empty: 'appSecret бос болмауы керек',
  js_code_empty: 'jsCode бос болмауы керек',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session сәтсіз аяқталды: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
