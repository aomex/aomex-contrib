import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** th-TH */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId ต้องไม่ว่างเปล่า',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken ต้องมี clientSecret',
  credential_empty: 'credential / id_token ต้องไม่ว่างเปล่า',
  access_token_empty: 'accessToken ต้องไม่ว่างเปล่า',
  auth_code_empty: 'authorization code ต้องไม่ว่างเปล่า',
  refresh_token_empty: 'refreshToken ต้องไม่ว่างเปล่า',
  credential_verify_failed: 'การตรวจสอบ Google credential ล้มเหลว: {{reason}}',
  hd_mismatch: 'hd ของ Google credential ไม่ตรงกัน: คาดหวัง {{expected}}, ได้ {{actual}}',
  userinfo_failed: 'Google userinfo ล้มเหลว: {{status}}',
  exchange_failed: 'การแลกโทเค็น Google ล้มเหลว: {{status}} {{detail}}',
});
