import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** az-AZ */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId boş olmamalıdır',
  app_secret_empty: 'appSecret boş olmamalıdır',
  js_code_empty: 'jsCode boş olmamalıdır',
  code2session_failed: 'WeChat code2session uğursuz oldu: {{errcode}} {{errmsg}}',
});
