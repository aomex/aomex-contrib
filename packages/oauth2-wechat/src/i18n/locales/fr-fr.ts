import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** fr-FR */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ne doit pas être vide',
  app_secret_empty: 'appSecret ne doit pas être vide',
  token_failed: "Échec de l'échange access_token WeChat : {{errcode}} {{errmsg}}",
  refresh_failed:
    'Échec du rafraîchissement access_token WeChat : {{errcode}} {{errmsg}}',
  userinfo_failed:
    "Échec de l'obtention des informations utilisateur WeChat : {{errcode}} {{errmsg}}",
  refresh_token_empty: 'refreshToken ne doit pas être vide',
  revoke_unsupported: "L'autorisation SNS WeChat ne prend pas en charge revoke",
});
