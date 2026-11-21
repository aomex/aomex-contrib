import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** es-ES */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId no debe estar vacío',
  app_secret_empty: 'appSecret no debe estar vacío',
  js_code_empty: 'jsCode no debe estar vacío',
  code2session_failed: 'Falló WeChat code2session: {{errcode}} {{errmsg}}',
});
