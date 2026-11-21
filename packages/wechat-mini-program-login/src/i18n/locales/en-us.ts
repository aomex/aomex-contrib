import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

export const en = I18n.satisfies(zh).define({
  app_id_empty: 'appId must not be empty',
  app_secret_empty: 'appSecret must not be empty',
  js_code_empty: 'jsCode must not be empty',
  code2session_failed: 'WeChat code2session failed: {{errcode}} {{errmsg}}',
});
