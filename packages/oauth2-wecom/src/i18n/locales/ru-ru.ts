import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ru-RU */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId не должен быть пустым',
  corp_secret_empty: 'corpSecret не должен быть пустым',
  agent_id_empty: 'agentId не должен быть пустым',
  access_token_failed: 'Сбой получения access_token WeCom: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Сбой получения личности пользователя WeCom: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo не вернул userid/openid',
  refresh_unsupported:
    'Веб-авторизация WeCom не поддерживает refresh на уровне пользователя',
  revoke_unsupported: 'Веб-авторизация WeCom не поддерживает revoke',
});
