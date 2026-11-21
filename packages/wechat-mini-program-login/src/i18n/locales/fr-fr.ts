import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** fr-FR */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ne doit pas être vide',
  app_secret_empty: 'appSecret ne doit pas être vide',
  js_code_empty: 'jsCode ne doit pas être vide',
  code2session_failed: 'Échec de WeChat code2session : {{errcode}} {{errmsg}}',
});
