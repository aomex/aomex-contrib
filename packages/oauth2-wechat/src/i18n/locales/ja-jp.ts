import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ja-JP */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId は空にできません',
  app_secret_empty: 'appSecret は空にできません',
  token_failed: 'WeChat の access_token 交換に失敗しました：{{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat の access_token 更新に失敗しました：{{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat のユーザー情報取得に失敗しました：{{errcode}} {{errmsg}}',
  access_token_failed:
    'WeChat の access_token 取得に失敗しました：{{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken は空にできません',
  revoke_unsupported: 'WeChat SNS 認可は revoke をサポートしていません',
});
