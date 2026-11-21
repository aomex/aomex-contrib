import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** gl-ES */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId non pode estar baleiro',
  app_secret_empty: 'appSecret non pode estar baleiro',
  js_code_empty: 'jsCode non pode estar baleiro',
  code2session_failed: 'Fallou WeChat code2session: {{errcode}} {{errmsg}}',
});
