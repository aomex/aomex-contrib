import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ca-ES */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId no pot estar buit',
  app_secret_empty: 'appSecret no pot estar buit',
  js_code_empty: 'jsCode no pot estar buit',
  code2session_failed: 'Ha fallat WeChat code2session: {{errcode}} {{errmsg}}',
});
