import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** pt-BR */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId não pode estar vazio',
  client_secret_empty:
    'clientSecret é obrigatório para exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token não pode estar vazio',
  access_token_empty: 'accessToken não pode estar vazio',
  auth_code_empty: 'authorization code não pode estar vazio',
  refresh_token_empty: 'refreshToken não pode estar vazio',
  credential_verify_failed: 'Falha na verificação do credential do Google: {{reason}}',
  hd_mismatch:
    'hd do credential do Google não confere: esperado {{expected}}, obtido {{actual}}',
  userinfo_failed: 'Falha no Google userinfo: {{status}}',
  exchange_failed: 'Falha na troca de token do Google: {{status}} {{detail}}',
});
