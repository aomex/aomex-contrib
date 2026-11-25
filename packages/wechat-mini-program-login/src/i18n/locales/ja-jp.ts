import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ja-JP */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId は空にできません',
  app_secret_empty: 'appSecret は空にできません',
  js_code_empty: 'jsCode は空にできません',
  phone_code_empty: 'phoneCode は空にできません',
  code2session_failed: 'WeChat code2session に失敗しました：{{errcode}} {{errmsg}}',
  access_token_failed:
    'WeChat の access_token 取得に失敗しました：{{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat の電話番号取得に失敗しました：{{errcode}} {{errmsg}}',
  invalid_json: '応答が有効な JSON ではありません',
});
