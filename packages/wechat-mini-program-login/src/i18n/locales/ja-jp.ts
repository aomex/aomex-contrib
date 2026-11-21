import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ja-JP */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId は空にできません',
  app_secret_empty: 'appSecret は空にできません',
  js_code_empty: 'jsCode は空にできません',
  code2session_failed: 'WeChat code2session に失敗しました：{{errcode}} {{errmsg}}',
});
