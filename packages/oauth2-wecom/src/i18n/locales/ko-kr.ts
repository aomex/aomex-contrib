import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ko-KR */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId는 비워둘 수 없습니다',
  corp_secret_empty: 'corpSecret는 비워둘 수 없습니다',
  agent_id_empty: 'agentId는 비워둘 수 없습니다',
  corp_token_failed: 'WeCom access_token 가져오기 실패: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom 방문 사용자 신원 가져오기 실패: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo가 userid/openid를 반환하지 않았습니다',
  refresh_unsupported: 'WeCom 웹 승인은 사용자 수준 refresh를 지원하지 않습니다',
  revoke_unsupported: 'WeCom 웹 승인은 revoke를 지원하지 않습니다',
});
