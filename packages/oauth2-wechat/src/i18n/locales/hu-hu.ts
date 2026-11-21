import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hu-HU */
export default I18n.satisfies(zh).define({
  app_id_empty: 'A appId nem lehet üres',
  app_secret_empty: 'A appSecret nem lehet üres',
  token_failed: 'WeChat access_token csere sikertelen: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token frissítés sikertelen: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'WeChat felhasználói adatok lekérése sikertelen: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'A refreshToken nem lehet üres',
  revoke_unsupported: 'A WeChat SNS engedélyezés nem támogatja a revoke-ot',
});
