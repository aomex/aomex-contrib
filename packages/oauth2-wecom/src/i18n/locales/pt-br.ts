import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** pt-BR */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId não pode estar vazio',
  corp_secret_empty: 'corpSecret não pode estar vazio',
  agent_id_empty: 'agentId não pode estar vazio',
  access_token_failed: 'Falha ao obter access_token do WeCom: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Falha ao obter a identidade do usuário WeCom: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo não retornou userid/openid',
  refresh_unsupported:
    'A autorização web do WeCom não oferece refresh em nível de usuário',
  revoke_unsupported: 'A autorização web do WeCom não oferece revoke',
});
