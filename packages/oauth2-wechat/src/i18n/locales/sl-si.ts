import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sl-SI */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ne sme biti prazen',
  app_secret_empty: 'appSecret ne sme biti prazen',
  token_failed: 'Izmenjava WeChat access_token ni uspela: {{errcode}} {{errmsg}}',
  refresh_failed: 'Osvežitev WeChat access_token ni uspela: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Pridobivanje podatkov uporabnika WeChat ni uspelo: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken ne sme biti prazen',
  revoke_unsupported: 'Pooblastitev WeChat SNS ne podpira revoke',
});
