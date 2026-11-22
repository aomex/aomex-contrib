import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** az-AZ */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId boş olmamalıdır',
  corp_secret_empty: 'corpSecret boş olmamalıdır',
  agent_id_empty: 'agentId boş olmamalıdır',
  access_token_failed: 'WeCom access_token alınmadı: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom istifadəçi kimliyi alınmadı: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo userid/openid qaytarmadı',
  refresh_unsupported: 'WeCom veb icazəsi istifadəçi səviyyəli refresh-i dəstəkləmir',
  revoke_unsupported: 'WeCom veb icazəsi revoke-u dəstəkləmir',
});
