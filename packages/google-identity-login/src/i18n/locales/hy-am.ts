import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hy-AM */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId-ը չպետք է դատարկ լինի',
  client_secret_empty:
    'exchangeAuthCode / refreshAccessToken-ի համար պահանջվում է clientSecret',
  credential_empty: 'credential / id_token-ը չպետք է դատարկ լինի',
  access_token_empty: 'accessToken-ը չպետք է դատարկ լինի',
  auth_code_empty: 'authorization code-ը չպետք է դատարկ լինի',
  refresh_token_empty: 'refreshToken-ը չպետք է դատարկ լինի',
  credential_verify_failed: 'Google credential-ի ստուգումը ձախողվեց՝ {{reason}}',
  hd_mismatch:
    'Google credential-ի hd-ը չի համընկնում․ սպասված {{expected}}, ստացված {{actual}}',
  userinfo_failed: 'Google userinfo-ն ձախողվեց՝ {{status}}',
  exchange_failed: 'Google նշանի փոխանակումը ձախողվեց՝ {{status}} {{detail}}',
});
