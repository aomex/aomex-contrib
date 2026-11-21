import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** el-GR */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'Το corpId δεν πρέπει να είναι κενό',
  corp_secret_empty: 'Το corpSecret δεν πρέπει να είναι κενό',
  agent_id_empty: 'Το agentId δεν πρέπει να είναι κενό',
  corp_token_failed: 'Η λήψη access_token WeCom απέτυχε: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Η λήψη ταυτότητας χρήστη WeCom απέτυχε: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'Το WeCom getuserinfo δεν επέστρεψε userid/openid',
  refresh_unsupported:
    'Η εξουσιοδότηση ιστού WeCom δεν υποστηρίζει refresh σε επίπεδο χρήστη',
  revoke_unsupported: 'Η εξουσιοδότηση ιστού WeCom δεν υποστηρίζει revoke',
});
