import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** my-MM */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId သည် ဗလာမဖြစ်ရပါ',
  app_secret_empty: 'appSecret သည် ဗလာမဖြစ်ရပါ',
  store_empty: 'store must not be empty',
  js_code_empty: 'jsCode သည် ဗလာမဖြစ်ရပါ',
  phone_code_empty: 'phoneCode must not be empty',
  code2session_failed: 'WeChat code2session မအောင်မြင်ပါ: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat get phone number failed: {{errcode}} {{errmsg}}',
  invalid_json: 'response is not valid JSON',
});
