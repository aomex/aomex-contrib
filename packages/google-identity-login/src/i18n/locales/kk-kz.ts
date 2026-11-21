import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** kk-KZ */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId бос болмауы керек',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken үшін clientSecret қажет',
  credential_empty: 'credential / id_token бос болмауы керек',
  access_token_empty: 'accessToken бос болмауы керек',
  auth_code_empty: 'authorization code бос болмауы керек',
  refresh_token_empty: 'refreshToken бос болмауы керек',
  credential_verify_failed: 'Google credential тексеруі сәтсіз аяқталды: {{reason}}',
  hd_mismatch:
    'Google credential hd сәйкес келмейді: күтілген {{expected}}, алынған {{actual}}',
  userinfo_failed: 'Google userinfo сәтсіз аяқталды: {{status}}',
  exchange_failed: 'Google токенін алмастыру сәтсіз аяқталды: {{status}} {{detail}}',
});
