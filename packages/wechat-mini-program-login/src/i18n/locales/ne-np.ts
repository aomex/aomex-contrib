import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ne-NP */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId खाली हुनु हुँदैन',
  app_secret_empty: 'appSecret खाली हुनु हुँदैन',
  js_code_empty: 'jsCode खाली हुनु हुँदैन',
  code2session_failed: 'WeChat code2session असफल: {{errcode}} {{errmsg}}',
});
