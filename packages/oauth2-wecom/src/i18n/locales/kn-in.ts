import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** kn-IN */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId ಖಾಲಿ ಇರಬಾರದು',
  corp_secret_empty: 'corpSecret ಖಾಲಿ ಇರಬಾರದು',
  agent_id_empty: 'agentId ಖಾಲಿ ಇರಬಾರದು',
  corp_token_failed: 'WeCom access_token ಪಡೆಯುವುದು ವಿಫಲ: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom ಬಳಕೆದಾರ ಗುರುತು ಪಡೆಯುವುದು ವಿಫಲ: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo userid/openid ಅನ್ನು ಹಿಂತಿರುಗಿಸಲಿಲ್ಲ',
  refresh_unsupported: 'WeCom ವೆಬ್ ಅನುಮೋದನೆ ಬಳಕೆದಾರ-ಮಟ್ಟದ refresh ಅನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ',
  revoke_unsupported: 'WeCom ವೆಬ್ ಅನುಮೋದನೆ revoke ಅನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ',
});
