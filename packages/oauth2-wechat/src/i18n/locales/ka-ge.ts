import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ka-GE */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId არ უნდა იყოს ცარიელი',
  app_secret_empty: 'appSecret არ უნდა იყოს ცარიელი',
  token_failed: 'WeChat access_token გაცვლა ვერ მოხერხდა: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token განახლება ვერ მოხერხდა: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'WeChat მომხმარებლის ინფორმაციის მიღება ვერ მოხერხდა: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken არ უნდა იყოს ცარიელი',
  revoke_unsupported: 'WeChat SNS ავტორიზაცია არ მხარს უჭერს revoke-ს',
});
