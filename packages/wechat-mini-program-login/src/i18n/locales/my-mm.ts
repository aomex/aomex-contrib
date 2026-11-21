import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** my-MM */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId သည် ဗလာမဖြစ်ရပါ',
  app_secret_empty: 'appSecret သည် ဗလာမဖြစ်ရပါ',
  js_code_empty: 'jsCode သည် ဗလာမဖြစ်ရပါ',
  code2session_failed: 'WeChat code2session မအောင်မြင်ပါ: {{errcode}} {{errmsg}}',
});
