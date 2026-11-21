import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

export const en = I18n.satisfies(zh).define({
  app_id_empty: 'appId must not be empty',
  app_secret_empty: 'appSecret must not be empty',
  token_failed: 'WeChat access_token exchange failed: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token refresh failed: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat userinfo failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken must not be empty',
  revoke_unsupported: 'WeChat SNS authorization does not support revoke',
});
