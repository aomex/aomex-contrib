import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** vi-VN */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId không được để trống',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken cần clientSecret',
  credential_empty: 'credential / id_token không được để trống',
  access_token_empty: 'accessToken không được để trống',
  auth_code_empty: 'authorization code không được để trống',
  refresh_token_empty: 'refreshToken không được để trống',
  credential_verify_failed: 'Xác minh Google credential thất bại: {{reason}}',
  hd_mismatch:
    'hd Google credential không khớp: kỳ vọng {{expected}}, thực tế {{actual}}',
  userinfo_failed: 'Google userinfo thất bại: {{status}}',
  exchange_failed: 'Đổi token Google thất bại: {{status}} {{detail}}',
});
