import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ml-IN */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ശൂന്യമായിരിക്കരുത്',
  app_secret_empty: 'appSecret ശൂന്യമായിരിക്കരുത്',
  token_failed: 'WeChat access_token കൈമാറ്റം പരാജയപ്പെട്ടു: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token പുതുക്കൽ പരാജയപ്പെട്ടു: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat ഉപയോക്തൃ വിവരം ലഭ്യമാക്കൽ പരാജയപ്പെട്ടു: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken ശൂന്യമായിരിക്കരുത്',
  revoke_unsupported: 'WeChat SNS അംഗീകാരം revoke പിന്തുണയ്ക്കുന്നില്ല',
});
