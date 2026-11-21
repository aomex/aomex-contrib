import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** da-DK */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId må ikke være tom',
  app_secret_empty: 'appSecret må ikke være tom',
  js_code_empty: 'jsCode må ikke være tom',
  code2session_failed: 'WeChat code2session mislykkedes: {{errcode}} {{errmsg}}',
});
