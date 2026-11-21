import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** it-IT */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId non deve essere vuoto',
  app_secret_empty: 'appSecret non deve essere vuoto',
  js_code_empty: 'jsCode non deve essere vuoto',
  code2session_failed: 'WeChat code2session non riuscito: {{errcode}} {{errmsg}}',
});
