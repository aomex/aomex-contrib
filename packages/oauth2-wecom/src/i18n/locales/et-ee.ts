import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** et-EE */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId ei tohi olla tühi',
  corp_secret_empty: 'corpSecret ei tohi olla tühi',
  agent_id_empty: 'agentId ei tohi olla tühi',
  corp_token_failed: 'WeComi access_tokeni hankimine ebaõnnestus: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'WeComi kasutajaidentiteedi hankimine ebaõnnestus: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo ei tagastanud userid/openid',
  refresh_unsupported: 'WeComi veebiautoriseerimine ei toeta kasutajataseme refresh’i',
  revoke_unsupported: 'WeComi veebiautoriseerimine ei toeta revoke’i',
});
