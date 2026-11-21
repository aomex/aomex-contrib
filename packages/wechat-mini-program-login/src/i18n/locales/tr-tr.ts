import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** tr-TR */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId boş olmamalı',
  app_secret_empty: 'appSecret boş olmamalı',
  js_code_empty: 'jsCode boş olmamalı',
  code2session_failed: 'WeChat code2session başarısız: {{errcode}} {{errmsg}}',
});
