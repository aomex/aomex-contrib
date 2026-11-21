import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** uk-UA */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId не повинен бути порожнім',
  app_secret_empty: 'appSecret не повинен бути порожнім',
  js_code_empty: 'jsCode не повинен бути порожнім',
  code2session_failed: 'Помилка WeChat code2session: {{errcode}} {{errmsg}}',
});
