import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** mr-IN */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId रिक्त असू नये',
  corp_secret_empty: 'corpSecret रिक्त असू नये',
  agent_id_empty: 'agentId रिक्त असू नये',
  corp_token_failed: 'WeCom access_token मिळवणे अयशस्वी: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom वापरकर्ता ओळख मिळवणे अयशस्वी: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo ने userid/openid परत केले नाही',
  refresh_unsupported: 'WeCom वेब अधिकृतता वापरकर्ता-स्तरीय refresh ला समर्थन देत नाही',
  revoke_unsupported: 'WeCom वेब अधिकृतता revoke ला समर्थन देत नाही',
});
