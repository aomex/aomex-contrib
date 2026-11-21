import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** pt-BR */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId não pode estar vazio',
  app_secret_empty: 'appSecret não pode estar vazio',
  token_failed: 'Falha na troca de access_token do WeChat: {{errcode}} {{errmsg}}',
  refresh_failed: 'Falha ao atualizar access_token do WeChat: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Falha ao obter informações do usuário WeChat: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken não pode estar vazio',
  revoke_unsupported: 'A autorização SNS do WeChat não oferece revoke',
});
