import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ko-KR */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId는 비워둘 수 없습니다',
  app_secret_empty: 'appSecret는 비워둘 수 없습니다',
  token_failed: 'WeChat access_token 교환 실패: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token 갱신 실패: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat 사용자 정보 가져오기 실패: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat access_token 가져오기 실패: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken는 비워둘 수 없습니다',
  revoke_unsupported: 'WeChat SNS 승인은 revoke를 지원하지 않습니다',
});
