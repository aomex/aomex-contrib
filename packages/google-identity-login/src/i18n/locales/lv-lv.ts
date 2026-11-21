import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** lv-LV */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId nedrīkst būt tukšs',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken nepieciešams clientSecret',
  credential_empty: 'credential / id_token nedrīkst būt tukšs',
  access_token_empty: 'accessToken nedrīkst būt tukšs',
  auth_code_empty: 'authorization code nedrīkst būt tukšs',
  refresh_token_empty: 'refreshToken nedrīkst būt tukšs',
  credential_verify_failed: 'Google credential pārbaude neizdevās: {{reason}}',
  hd_mismatch: 'Google credential hd nesakrīt: gaidīts {{expected}}, saņemts {{actual}}',
  userinfo_failed: 'Google userinfo neizdevās: {{status}}',
  exchange_failed: 'Google žetona apmaiņa neizdevās: {{status}} {{detail}}',
});
