import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** el-GR */
export default I18n.satisfies(zh).define({
  app_id_empty: 'Το appId δεν πρέπει να είναι κενό',
  app_secret_empty: 'Το appSecret δεν πρέπει να είναι κενό',
  js_code_empty: 'Το jsCode δεν πρέπει να είναι κενό',
  code2session_failed: 'Το WeChat code2session απέτυχε: {{errcode}} {{errmsg}}',
});
