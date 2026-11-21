import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** mn-MN */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId хоосон байж болохгүй',
  app_secret_empty: 'appSecret хоосон байж болохгүй',
  token_failed: 'WeChat access_token солих амжилтгүй: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token шинэчлэх амжилтгүй: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat хэрэглэгчийн мэдээлэл авах амжилтгүй: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken хоосон байж болохгүй',
  revoke_unsupported: 'WeChat SNS зөвшөөрөл revoke-г дэмждэггүй',
});
