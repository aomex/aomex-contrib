import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** be-BY */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId не павінен быць пустым',
  corp_secret_empty: 'corpSecret не павінен быць пустым',
  agent_id_empty: 'agentId не павінен быць пустым',
  corp_token_failed: 'Збой атрымання access_token WeCom: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Збой атрымання ідэнтычнасці карыстальніка WeCom: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo не вярнуў userid/openid',
  refresh_unsupported:
    'Вэб-аўтарызацыя WeCom не падтрымлівае refresh на ўзроўні карыстальніка',
  revoke_unsupported: 'Вэб-аўтарызацыя WeCom не падтрымлівае revoke',
});
