import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ku-IQ */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId نابێت بەتاڵ بێت',
  corp_secret_empty: 'corpSecret نابێت بەتاڵ بێت',
  agent_id_empty: 'agentId نابێت بەتاڵ بێت',
  access_token_failed:
    'وەرگرتنی access_token ی WeCom سەرکەوتوو نەبوو: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'وەرگرتنی ناسنامەی بەکارهێنەری WeCom سەرکەوتوو نەبوو: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo userid/openid نەگەڕاندەوە',
  refresh_unsupported: 'ڕێپێدانی وێبی WeCom پشتگیری refresh ی ئاستی بەکارهێنەر ناکات',
  revoke_unsupported: 'ڕێپێدانی وێبی WeCom پشتگیری revoke ناکات',
});
