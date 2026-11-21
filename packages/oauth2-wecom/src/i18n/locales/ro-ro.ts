import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ro-RO */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId nu trebuie să fie gol',
  corp_secret_empty: 'corpSecret nu trebuie să fie gol',
  agent_id_empty: 'agentId nu trebuie să fie gol',
  corp_token_failed: 'Obținerea access_token WeCom a eșuat: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Obținerea identității utilizatorului WeCom a eșuat: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo nu a returnat userid/openid',
  refresh_unsupported: 'Autorizarea web WeCom nu acceptă refresh la nivel de utilizator',
  revoke_unsupported: 'Autorizarea web WeCom nu acceptă revoke',
});
