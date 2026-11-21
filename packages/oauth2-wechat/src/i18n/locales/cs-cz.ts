import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** cs-CZ */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId nesmí být prázdný',
  app_secret_empty: 'appSecret nesmí být prázdný',
  token_failed: 'Výměna access_token WeChat selhala: {{errcode}} {{errmsg}}',
  refresh_failed: 'Obnovení access_token WeChat selhalo: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Získání informací o uživateli WeChat selhalo: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken nesmí být prázdný',
  revoke_unsupported: 'Autorizace WeChat SNS nepodporuje revoke',
});
