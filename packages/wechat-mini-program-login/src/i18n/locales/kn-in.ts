import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** kn-IN */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ಖಾಲಿ ಇರಬಾರದು',
  app_secret_empty: 'appSecret ಖಾಲಿ ಇರಬಾರದು',
  store_empty: 'store must not be empty',
  js_code_empty: 'jsCode ಖಾಲಿ ಇರಬಾರದು',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session ವಿಫಲ: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
