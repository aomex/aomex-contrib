import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hy-AM */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId-ը չպետք է դատարկ լինի',
  corp_secret_empty: 'corpSecret-ը չպետք է դատարկ լինի',
  agent_id_empty: 'agentId-ը չպետք է դատարկ լինի',
  access_token_failed: 'WeCom access_token ստացումը ձախողվեց՝ {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom օգտատիրոջ ինքնության ստացումը ձախողվեց՝ {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo-ը չվերադարձրեց userid/openid',
  refresh_unsupported:
    'WeCom վեբ թույլտվությունը չի աջակցում օգտատիրոջ մակարդակի refresh',
  revoke_unsupported: 'WeCom վեբ թույլտվությունը չի աջակցում revoke',
});
