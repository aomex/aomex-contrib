import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** pl-PL */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId nie może być pusty',
  corp_secret_empty: 'corpSecret nie może być pusty',
  agent_id_empty: 'agentId nie może być pusty',
  corp_token_failed:
    'Pobranie access_token WeCom nie powiodło się: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Pobranie tożsamości użytkownika WeCom nie powiodło się: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo nie zwróciło userid/openid',
  refresh_unsupported:
    'Autoryzacja WWW WeCom nie obsługuje refresh na poziomie użytkownika',
  revoke_unsupported: 'Autoryzacja WWW WeCom nie obsługuje revoke',
});
