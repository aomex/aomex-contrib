import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** kn-IN */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ಖಾಲಿ ಇರಬಾರದು',
  app_secret_empty: 'appSecret ಖಾಲಿ ಇರಬಾರದು',
  token_failed: 'WeChat access_token ವಿನಿಮಯ ವಿಫಲ: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token ರಿಫ್ರೆಶ್ ವಿಫಲ: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat ಬಳಕೆದಾರ ಮಾಹಿತಿ ಪಡೆಯುವುದು ವಿಫಲ: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken ಖಾಲಿ ಇರಬಾರದು',
  revoke_unsupported: 'WeChat SNS ಅನುಮೋದನೆ revoke ಅನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ',
});
