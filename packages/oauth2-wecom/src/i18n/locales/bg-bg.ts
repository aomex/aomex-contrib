import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** bg-BG */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId не трябва да е празен',
  corp_secret_empty: 'corpSecret не трябва да е празен',
  agent_id_empty: 'agentId не трябва да е празен',
  corp_token_failed:
    'Получаването на access_token за WeCom не успя: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Получаването на идентичност на потребител WeCom не успя: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo не върна userid/openid',
  refresh_unsupported:
    'Уеб упълномощаването WeCom не поддържа refresh на потребителско ниво',
  revoke_unsupported: 'Уеб упълномощаването WeCom не поддържа revoke',
});
