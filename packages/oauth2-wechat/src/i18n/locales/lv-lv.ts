import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** lv-LV */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId nedrīkst būt tukšs',
  app_secret_empty: 'appSecret nedrīkst būt tukšs',
  token_failed: 'WeChat access_token apmaiņa neizdevās: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token atsvaidzināšana neizdevās: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'WeChat lietotāja informācijas iegūšana neizdevās: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken nedrīkst būt tukšs',
  revoke_unsupported: 'WeChat SNS autorizācija neatbalsta revoke',
});
