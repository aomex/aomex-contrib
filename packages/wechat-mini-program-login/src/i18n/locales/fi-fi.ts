import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** fi-FI */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ei saa olla tyhjä',
  app_secret_empty: 'appSecret ei saa olla tyhjä',
  js_code_empty: 'jsCode ei saa olla tyhjä',
  code2session_failed: 'WeChat code2session epäonnistui: {{errcode}} {{errmsg}}',
});
