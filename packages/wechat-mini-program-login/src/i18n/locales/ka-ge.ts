import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ka-GE */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId არ უნდა იყოს ცარიელი',
  app_secret_empty: 'appSecret არ უნდა იყოს ცარიელი',
  js_code_empty: 'jsCode არ უნდა იყოს ცარიელი',
  code2session_failed: 'WeChat code2session ვერ მოხერხდა: {{errcode}} {{errmsg}}',
});
