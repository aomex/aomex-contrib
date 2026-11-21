import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** cs-CZ */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId nesmí být prázdný',
  app_secret_empty: 'appSecret nesmí být prázdný',
  js_code_empty: 'jsCode nesmí být prázdný',
  code2session_failed: 'WeChat code2session selhalo: {{errcode}} {{errmsg}}',
});
