import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hr-HR */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId ne smije biti prazan',
  corp_secret_empty: 'corpSecret ne smije biti prazan',
  agent_id_empty: 'agentId ne smije biti prazan',
  access_token_failed:
    'Dohvaćanje WeCom access_token nije uspjelo: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Dohvaćanje identiteta korisnika WeCom nije uspjelo: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo nije vratio userid/openid',
  refresh_unsupported: 'WeCom web autorizacija ne podržava refresh na razini korisnika',
  revoke_unsupported: 'WeCom web autorizacija ne podržava revoke',
});
