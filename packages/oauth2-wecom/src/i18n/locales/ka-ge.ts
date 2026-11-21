import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ka-GE */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId არ უნდა იყოს ცარიელი',
  corp_secret_empty: 'corpSecret არ უნდა იყოს ცარიელი',
  agent_id_empty: 'agentId არ უნდა იყოს ცარიელი',
  corp_token_failed: 'WeCom access_token მიღება ვერ მოხერხდა: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'WeCom მომხმარებლის იდენტობის მიღება ვერ მოხერხდა: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo-მ არ დააბრუნა userid/openid',
  refresh_unsupported:
    'WeCom ვებ ავტორიზაცია არ მხარს უჭერს მომხმარებლის დონის refresh-ს',
  revoke_unsupported: 'WeCom ვებ ავტორიზაცია არ მხარს უჭერს revoke-ს',
});
