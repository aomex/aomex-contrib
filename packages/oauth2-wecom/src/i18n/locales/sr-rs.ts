import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sr-RS */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId ne sme biti prazan',
  corp_secret_empty: 'corpSecret ne sme biti prazan',
  agent_id_empty: 'agentId ne sme biti prazan',
  access_token_failed:
    'Preuzimanje WeCom access_token nije uspelo: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Preuzimanje identiteta korisnika WeCom nije uspelo: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo nije vratio userid/openid',
  refresh_unsupported: 'WeCom web autorizacija ne podržava refresh na nivou korisnika',
  revoke_unsupported: 'WeCom web autorizacija ne podržava revoke',
});
