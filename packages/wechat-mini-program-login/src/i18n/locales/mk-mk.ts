import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** mk-MK */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId не смее да биде празен',
  app_secret_empty: 'appSecret не смее да биде празен',
  js_code_empty: 'jsCode не смее да биде празен',
  code2session_failed: 'WeChat code2session не успеа: {{errcode}} {{errmsg}}',
});
