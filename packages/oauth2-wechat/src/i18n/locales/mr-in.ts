import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** mr-IN */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId रिक्त असू नये',
  app_secret_empty: 'appSecret रिक्त असू नये',
  token_failed: 'WeChat access_token देवाणघेवाण अयशस्वी: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token रिफ्रेश अयशस्वी: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat वापरकर्ता माहिती मिळवणे अयशस्वी: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken रिक्त असू नये',
  revoke_unsupported: 'WeChat SNS अधिकृतता revoke ला समर्थन देत नाही',
});
