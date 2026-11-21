import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** km-KH */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId មិនអាចទទេបានទេ',
  app_secret_empty: 'appSecret មិនអាចទទេបានទេ',
  token_failed: 'ការផ្លាស់ប្តូរ access_token WeChat បរាជ័យ៖ {{errcode}} {{errmsg}}',
  refresh_failed: 'ការផ្ទុកឡើងវិញ access_token WeChat បរាជ័យ៖ {{errcode}} {{errmsg}}',
  userinfo_failed: 'ការទទួលព័ត៌មានអ្នកប្រើ WeChat បរាជ័យ៖ {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken មិនអាចទទេបានទេ',
  revoke_unsupported: 'ការអនុញ្ញាត SNS WeChat មិនគាំទ្រ revoke ទេ',
});
