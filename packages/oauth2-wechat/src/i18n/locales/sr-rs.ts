import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sr-RS */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ne sme biti prazan',
  app_secret_empty: 'appSecret ne sme biti prazan',
  token_failed: 'Zamena WeChat access_token nije uspela: {{errcode}} {{errmsg}}',
  refresh_failed: 'Osvežavanje WeChat access_token nije uspelo: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Preuzimanje podataka korisnika WeChat nije uspelo: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken ne sme biti prazan',
  revoke_unsupported: 'WeChat SNS autorizacija ne podržava revoke',
});
