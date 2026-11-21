import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** nl-NL */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId mag niet leeg zijn',
  app_secret_empty: 'appSecret mag niet leeg zijn',
  token_failed: 'WeChat access_token-uitwisseling mislukt: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token-vernieuwing mislukt: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Ophalen van WeChat-gebruikersgegevens mislukt: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken mag niet leeg zijn',
  revoke_unsupported: 'WeChat SNS-autorisatie ondersteunt revoke niet',
});
