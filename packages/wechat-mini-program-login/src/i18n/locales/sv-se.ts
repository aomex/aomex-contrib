import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sv-SE */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId får inte vara tomt',
  app_secret_empty: 'appSecret får inte vara tomt',
  js_code_empty: 'jsCode får inte vara tomt',
  code2session_failed: 'WeChat code2session misslyckades: {{errcode}} {{errmsg}}',
});
