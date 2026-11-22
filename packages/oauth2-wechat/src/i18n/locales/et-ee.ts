import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** et-EE */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ei tohi olla tühi',
  app_secret_empty: 'appSecret ei tohi olla tühi',
  token_failed: 'WeChat access_token vahetamine ebaõnnestus: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token värskendamine ebaõnnestus: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChati kasutajateabe hankimine ebaõnnestus: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken ei tohi olla tühi',
  revoke_unsupported: 'WeChati SNS-autoriseerimine ei toeta revoke’i',
});
