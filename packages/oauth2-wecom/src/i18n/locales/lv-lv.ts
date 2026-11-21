import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** lv-LV */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId nedrīkst būt tukšs',
  corp_secret_empty: 'corpSecret nedrīkst būt tukšs',
  agent_id_empty: 'agentId nedrīkst būt tukšs',
  corp_token_failed: 'WeCom access_token iegūšana neizdevās: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'WeCom lietotāja identitātes iegūšana neizdevās: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo neatgrieza userid/openid',
  refresh_unsupported: 'WeCom tīmekļa autorizācija neatbalsta lietotāja līmeņa refresh',
  revoke_unsupported: 'WeCom tīmekļa autorizācija neatbalsta revoke',
});
