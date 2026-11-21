import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ne-NP */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId खाली हुनु हुँदैन',
  corp_secret_empty: 'corpSecret खाली हुनु हुँदैन',
  agent_id_empty: 'agentId खाली हुनु हुँदैन',
  corp_token_failed: 'WeCom access_token प्राप्त गर्न असफल: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom प्रयोगकर्ता पहिचान प्राप्त गर्न असफल: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo ले userid/openid फर्काएन',
  refresh_unsupported: 'WeCom वेब प्राधिकरणले प्रयोगकर्ता-स्तरको refresh समर्थन गर्दैन',
  revoke_unsupported: 'WeCom वेब प्राधिकरणले revoke समर्थन गर्दैन',
});
