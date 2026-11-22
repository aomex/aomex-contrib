import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** id-ID */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId tidak boleh kosong',
  app_secret_empty: 'appSecret tidak boleh kosong',
  token_failed: 'Pertukaran access_token WeChat gagal: {{errcode}} {{errmsg}}',
  refresh_failed: 'Penyegaran access_token WeChat gagal: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Gagal mendapatkan info pengguna WeChat: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken tidak boleh kosong',
  revoke_unsupported: 'Otorisasi SNS WeChat tidak mendukung revoke',
});
