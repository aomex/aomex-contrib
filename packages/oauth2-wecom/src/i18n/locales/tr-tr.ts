import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** tr-TR */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId boş olmamalı',
  corp_secret_empty: 'corpSecret boş olmamalı',
  agent_id_empty: 'agentId boş olmamalı',
  access_token_failed: 'WeCom access_token alma başarısız: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom kullanıcı kimliği alınamadı: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo userid/openid döndürmedi',
  refresh_unsupported:
    'WeCom web yetkilendirmesi kullanıcı düzeyinde refresh desteklemez',
  revoke_unsupported: 'WeCom web yetkilendirmesi revoke desteklemez',
});
