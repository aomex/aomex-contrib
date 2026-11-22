import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ca-ES */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId no pot estar buit',
  app_secret_empty: 'appSecret no pot estar buit',
  token_failed: "Ha fallat l'intercanvi d'access_token de WeChat: {{errcode}} {{errmsg}}",
  refresh_failed:
    "Ha fallat l'actualització d'access_token de WeChat: {{errcode}} {{errmsg}}",
  userinfo_failed:
    "Ha fallat l'obtenció d'informació d'usuari de WeChat: {{errcode}} {{errmsg}}",
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken no pot estar buit',
  revoke_unsupported: "L'autorització SNS de WeChat no admet revoke",
});
