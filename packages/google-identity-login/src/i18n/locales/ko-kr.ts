import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ko-KR */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId는 비워둘 수 없습니다',
  client_secret_empty:
    'exchangeAuthCode / refreshAccessToken에는 clientSecret이 필요합니다',
  credential_empty: 'credential / id_token은 비워둘 수 없습니다',
  access_token_empty: 'accessToken은 비워둘 수 없습니다',
  auth_code_empty: 'authorization code는 비워둘 수 없습니다',
  refresh_token_empty: 'refreshToken는 비워둘 수 없습니다',
  credential_verify_failed: 'Google credential 검증 실패: {{reason}}',
  hd_mismatch: 'Google credential hd 불일치: 기대 {{expected}}, 실제 {{actual}}',
  userinfo_failed: 'Google userinfo 실패: {{status}}',
  exchange_failed: 'Google 토큰 교환 실패: {{status}} {{detail}}',
});
