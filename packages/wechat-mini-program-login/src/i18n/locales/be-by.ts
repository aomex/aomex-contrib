import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** be-BY */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId не павінен быць пустым',
  app_secret_empty: 'appSecret не павінен быць пустым',
  js_code_empty: 'jsCode не павінен быць пустым',
  code2session_failed: 'Збой WeChat code2session: {{errcode}} {{errmsg}}',
});
