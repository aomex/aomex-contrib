import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hr-HR */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ne smije biti prazan',
  app_secret_empty: 'appSecret ne smije biti prazan',
  token_failed: 'Zamjena WeChat access_token nije uspjela: {{errcode}} {{errmsg}}',
  refresh_failed: 'Osvježavanje WeChat access_token nije uspjelo: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Dohvaćanje podataka korisnika WeChat nije uspjelo: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken ne smije biti prazan',
  revoke_unsupported: 'WeChat SNS autorizacija ne podržava revoke',
});
