import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sk-SK */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId nesmie byť prázdny',
  app_secret_empty: 'appSecret nesmie byť prázdny',
  token_failed: 'Výmena access_token WeChat zlyhala: {{errcode}} {{errmsg}}',
  refresh_failed: 'Obnovenie access_token WeChat zlyhalo: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Získanie informácií o používateľovi WeChat zlyhalo: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken nesmie byť prázdny',
  revoke_unsupported: 'Autorizácia WeChat SNS nepodporuje revoke',
});
