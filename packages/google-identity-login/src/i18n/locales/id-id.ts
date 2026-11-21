import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** id-ID */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId tidak boleh kosong',
  client_secret_empty: 'clientSecret wajib untuk exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token tidak boleh kosong',
  access_token_empty: 'accessToken tidak boleh kosong',
  auth_code_empty: 'authorization code tidak boleh kosong',
  refresh_token_empty: 'refreshToken tidak boleh kosong',
  credential_verify_failed: 'Verifikasi Google credential gagal: {{reason}}',
  hd_mismatch:
    'hd Google credential tidak cocok: diharapkan {{expected}}, didapat {{actual}}',
  userinfo_failed: 'Google userinfo gagal: {{status}}',
  exchange_failed: 'Pertukaran token Google gagal: {{status}} {{detail}}',
});
