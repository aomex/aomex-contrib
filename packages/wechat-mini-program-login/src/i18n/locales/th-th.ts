import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** th-TH */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ต้องไม่ว่างเปล่า',
  app_secret_empty: 'appSecret ต้องไม่ว่างเปล่า',
  js_code_empty: 'jsCode ต้องไม่ว่างเปล่า',
  code2session_failed: 'WeChat code2session ล้มเหลว: {{errcode}} {{errmsg}}',
});
