import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ar-EG */
export default I18n.satisfies(zh).define({
  app_id_empty: 'يجب ألا يكون appId فارغًا',
  app_secret_empty: 'يجب ألا يكون appSecret فارغًا',
  js_code_empty: 'يجب ألا يكون jsCode فارغًا',
  code2session_failed: 'فشل WeChat code2session: {{errcode}} {{errmsg}}',
});
