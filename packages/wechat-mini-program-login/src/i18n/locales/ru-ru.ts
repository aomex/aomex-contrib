import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ru-RU */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId не должен быть пустым',
  app_secret_empty: 'appSecret не должен быть пустым',
  js_code_empty: 'jsCode не должен быть пустым',
  code2session_failed: 'Сбой WeChat code2session: {{errcode}} {{errmsg}}',
});
