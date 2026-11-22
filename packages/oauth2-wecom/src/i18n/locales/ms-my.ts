import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ms-MY */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId tidak boleh kosong',
  corp_secret_empty: 'corpSecret tidak boleh kosong',
  agent_id_empty: 'agentId tidak boleh kosong',
  access_token_failed: 'Gagal mendapatkan access_token WeCom: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Gagal mendapatkan identiti pengguna WeCom: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo tidak mengembalikan userid/openid',
  refresh_unsupported: 'Kebenaran web WeCom tidak menyokong refresh peringkat pengguna',
  revoke_unsupported: 'Kebenaran web WeCom tidak menyokong revoke',
});
