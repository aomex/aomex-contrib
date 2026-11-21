import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** kn-IN */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId ಖಾಲಿ ಇರಬಾರದು',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken ಗೆ clientSecret ಅಗತ್ಯ',
  credential_empty: 'credential / id_token ಖಾಲಿ ಇರಬಾರದು',
  access_token_empty: 'accessToken ಖಾಲಿ ಇರಬಾರದು',
  auth_code_empty: 'authorization code ಖಾಲಿ ಇರಬಾರದು',
  refresh_token_empty: 'refreshToken ಖಾಲಿ ಇರಬಾರದು',
  credential_verify_failed: 'Google credential ಪರಿಶೀಲನೆ ವಿಫಲ: {{reason}}',
  hd_mismatch:
    'Google credential hd ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ: ನಿರೀಕ್ಷಿತ {{expected}}, ದೊರೆತ {{actual}}',
  userinfo_failed: 'Google userinfo ವಿಫಲ: {{status}}',
  exchange_failed: 'Google ಟೋಕನ್ ವಿನಿಮಯ ವಿಫಲ: {{status}} {{detail}}',
});
