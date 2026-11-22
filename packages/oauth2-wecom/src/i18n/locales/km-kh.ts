import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** km-KH */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId មិនអាចទទេបានទេ',
  corp_secret_empty: 'corpSecret មិនអាចទទេបានទេ',
  agent_id_empty: 'agentId មិនអាចទទេបានទេ',
  access_token_failed: 'ការទទួល access_token WeCom បរាជ័យ៖ {{errcode}} {{errmsg}}',
  userinfo_failed: 'ការទទួលអត្តសញ្ញាណអ្នកប្រើ WeCom បរាជ័យ៖ {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo មិនបានត្រឡប់ userid/openid ទេ',
  refresh_unsupported: 'ការអនុញ្ញាតគេហទំព័រ WeCom មិនគាំទ្រ refresh កម្រិតអ្នកប្រើទេ',
  revoke_unsupported: 'ការអនុញ្ញាតគេហទំព័រ WeCom មិនគាំទ្រ revoke ទេ',
});
