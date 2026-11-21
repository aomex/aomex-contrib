import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ta-IN */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId காலியாக இருக்கக்கூடாது',
  corp_secret_empty: 'corpSecret காலியாக இருக்கக்கூடாது',
  agent_id_empty: 'agentId காலியாக இருக்கக்கூடாது',
  corp_token_failed: 'WeCom access_token பெறுதல் தோல்வி: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom பயனர் அடையாளம் பெறுதல் தோல்வி: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo userid/openid ஐத் திருப்பியளிக்கவில்லை',
  refresh_unsupported: 'WeCom வலை அங்கீகாரம் பயனர் நிலை refresh ஐ ஆதரிக்காது',
  revoke_unsupported: 'WeCom வலை அங்கீகாரம் revoke ஐ ஆதரிக்காது',
});
