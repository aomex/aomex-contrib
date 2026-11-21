import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** nb-NO */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId kan ikke være tom',
  app_secret_empty: 'appSecret kan ikke være tom',
  js_code_empty: 'jsCode kan ikke være tom',
  code2session_failed: 'WeChat code2session mislyktes: {{errcode}} {{errmsg}}',
});
