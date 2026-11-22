import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** mk-MK */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId не смее да биде празен',
  corp_secret_empty: 'corpSecret не смее да биде празен',
  agent_id_empty: 'agentId не смее да биде празен',
  access_token_failed:
    'Преземањето на WeCom access_token не успеа: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Преземањето идентитет на корисник на WeCom не успеа: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo не врати userid/openid',
  refresh_unsupported: 'WeCom веб овластувањето не поддржува refresh на корисничко ниво',
  revoke_unsupported: 'WeCom веб овластувањето не поддржува revoke',
});
