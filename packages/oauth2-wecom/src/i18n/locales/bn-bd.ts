import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** bn-BD */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId খালি রাখা যাবে না',
  corp_secret_empty: 'corpSecret খালি রাখা যাবে না',
  agent_id_empty: 'agentId খালি রাখা যাবে না',
  corp_token_failed: 'WeCom access_token পাওয়া ব্যর্থ: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom ব্যবহারকারী পরিচয় পাওয়া ব্যর্থ: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo userid/openid ফেরত দেয়নি',
  refresh_unsupported: 'WeCom ওয়েব অনুমোদন ব্যবহারকারী-স্তরের refresh সমর্থন করে না',
  revoke_unsupported: 'WeCom ওয়েব অনুমোদন revoke সমর্থন করে না',
});
