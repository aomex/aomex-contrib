import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sk-SK */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId nesmie byť prázdny',
  app_secret_empty: 'appSecret nesmie byť prázdny',
  js_code_empty: 'jsCode nesmie byť prázdny',
  code2session_failed: 'WeChat code2session zlyhalo: {{errcode}} {{errmsg}}',
});
