import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ka-GE */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId არ უნდა იყოს ცარიელი',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken-სთვის საჭიროა clientSecret',
  credential_empty: 'credential / id_token არ უნდა იყოს ცარიელი',
  access_token_empty: 'accessToken არ უნდა იყოს ცარიელი',
  auth_code_empty: 'authorization code არ უნდა იყოს ცარიელი',
  refresh_token_empty: 'refreshToken არ უნდა იყოს ცარიელი',
  credential_verify_failed: 'Google credential-ის შემოწმება ვერ მოხერხდა: {{reason}}',
  hd_mismatch:
    'Google credential-ის hd არ ემთხვევა: მოსალოდნელი {{expected}}, მიღებული {{actual}}',
  userinfo_failed: 'Google userinfo ვერ მოხერხდა: {{status}}',
  exchange_failed: 'Google ტოკენის გაცვლა ვერ მოხერხდა: {{status}} {{detail}}',
});
