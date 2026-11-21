import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hu-HU */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'A corpId nem lehet üres',
  corp_secret_empty: 'A corpSecret nem lehet üres',
  agent_id_empty: 'A agentId nem lehet üres',
  corp_token_failed: 'WeCom access_token lekérése sikertelen: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'WeCom felhasználói azonosító lekérése sikertelen: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'A WeCom getuserinfo nem adott vissza userid/openid értéket',
  refresh_unsupported:
    'A WeCom webes engedélyezés nem támogatja a felhasználói szintű refresh-t',
  revoke_unsupported: 'A WeCom webes engedélyezés nem támogatja a revoke-ot',
});
