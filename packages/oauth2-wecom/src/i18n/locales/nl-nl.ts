import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** nl-NL */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId mag niet leeg zijn',
  corp_secret_empty: 'corpSecret mag niet leeg zijn',
  agent_id_empty: 'agentId mag niet leeg zijn',
  corp_token_failed: 'Ophalen van WeCom access_token mislukt: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Ophalen van WeCom-gebruikersidentiteit mislukt: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo gaf geen userid/openid terug',
  refresh_unsupported:
    'WeCom-webautorisatie ondersteunt geen refresh op gebruikersniveau',
  revoke_unsupported: 'WeCom-webautorisatie ondersteunt revoke niet',
});
