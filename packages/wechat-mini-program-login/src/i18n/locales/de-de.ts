import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** de-DE */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId darf nicht leer sein',
  app_secret_empty: 'appSecret darf nicht leer sein',
  js_code_empty: 'jsCode darf nicht leer sein',
  code2session_failed: 'WeChat code2session fehlgeschlagen: {{errcode}} {{errmsg}}',
});
