import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hi-IN */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId खाली नहीं होना चाहिए',
  corp_secret_empty: 'corpSecret खाली नहीं होना चाहिए',
  agent_id_empty: 'agentId खाली नहीं होना चाहिए',
  access_token_failed: 'WeCom access_token प्राप्त करना विफल: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom उपयोगकर्ता पहचान प्राप्त करना विफल: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo ने userid/openid नहीं लौटाया',
  refresh_unsupported: 'WeCom वेब प्राधिकरण उपयोगकर्ता-स्तरीय refresh का समर्थन नहीं करता',
  revoke_unsupported: 'WeCom वेब प्राधिकरण revoke का समर्थन नहीं करता',
});
