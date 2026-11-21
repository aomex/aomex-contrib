import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sl-SI */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ne sme biti prazen',
  app_secret_empty: 'appSecret ne sme biti prazen',
  js_code_empty: 'jsCode ne sme biti prazen',
  code2session_failed: 'WeChat code2session ni uspel: {{errcode}} {{errmsg}}',
});
