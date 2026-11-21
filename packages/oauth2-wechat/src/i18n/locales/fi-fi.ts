import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** fi-FI */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ei saa olla tyhjä',
  app_secret_empty: 'appSecret ei saa olla tyhjä',
  token_failed: 'WeChat access_token -vaihto epäonnistui: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token -päivitys epäonnistui: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat-käyttäjätietojen haku epäonnistui: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken ei saa olla tyhjä',
  revoke_unsupported: 'WeChat SNS -valtuutus ei tue revokea',
});
