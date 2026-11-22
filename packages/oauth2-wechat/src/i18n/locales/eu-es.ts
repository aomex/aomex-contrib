import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** eu-ES */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ezin da hutsik egon',
  app_secret_empty: 'appSecret ezin da hutsik egon',
  token_failed: 'WeChat access_token trukeak huts egin du: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token freskatzeak huts egin du: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'WeChat erabiltzaile-informazioa eskuratzeak huts egin du: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken ezin da hutsik egon',
  revoke_unsupported: 'WeChat SNS baimenak ez du revoke onartzen',
});
