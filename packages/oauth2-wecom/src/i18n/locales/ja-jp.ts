import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ja-JP */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId は空にできません',
  corp_secret_empty: 'corpSecret は空にできません',
  agent_id_empty: 'agentId は空にできません',
  access_token_failed: 'WeCom の access_token 取得に失敗しました：{{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom の訪問ユーザー身元取得に失敗しました：{{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo が userid/openid を返しませんでした',
  refresh_unsupported:
    'WeCom ウェブ認可はユーザーレベルの refresh をサポートしていません',
  revoke_unsupported: 'WeCom ウェブ認可は revoke をサポートしていません',
});
