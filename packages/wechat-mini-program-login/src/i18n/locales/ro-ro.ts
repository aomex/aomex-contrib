import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ro-RO */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId nu trebuie să fie gol',
  app_secret_empty: 'appSecret nu trebuie să fie gol',
  js_code_empty: 'jsCode nu trebuie să fie gol',
  code2session_failed: 'WeChat code2session a eșuat: {{errcode}} {{errmsg}}',
});
