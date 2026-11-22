import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sl-SI */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId ne sme biti prazen',
  corp_secret_empty: 'corpSecret ne sme biti prazen',
  agent_id_empty: 'agentId ne sme biti prazen',
  access_token_failed:
    'Pridobivanje WeCom access_token ni uspelo: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Pridobivanje identitete uporabnika WeCom ni uspelo: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo ni vrnil userid/openid',
  refresh_unsupported:
    'Spletna pooblastitev WeCom ne podpira refresh na ravni uporabnika',
  revoke_unsupported: 'Spletna pooblastitev WeCom ne podpira revoke',
});
