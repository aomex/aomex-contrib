import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** pl-PL */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId nie może być pusty',
  app_secret_empty: 'appSecret nie może być pusty',
  token_failed: 'Wymiana access_token WeChat nie powiodła się: {{errcode}} {{errmsg}}',
  refresh_failed:
    'Odświeżenie access_token WeChat nie powiodło się: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Pobranie informacji o użytkowniku WeChat nie powiodło się: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken nie może być pusty',
  revoke_unsupported: 'Autoryzacja SNS WeChat nie obsługuje revoke',
});
