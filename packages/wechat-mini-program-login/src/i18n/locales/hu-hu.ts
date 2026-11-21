import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hu-HU */
export default I18n.satisfies(zh).define({
  app_id_empty: 'A appId nem lehet üres',
  app_secret_empty: 'A appSecret nem lehet üres',
  js_code_empty: 'A jsCode nem lehet üres',
  code2session_failed: 'WeChat code2session sikertelen: {{errcode}} {{errmsg}}',
});
