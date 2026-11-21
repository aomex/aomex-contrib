import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** kk-KZ */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId бос болмауы керек',
  corp_secret_empty: 'corpSecret бос болмауы керек',
  agent_id_empty: 'agentId бос болмауы керек',
  corp_token_failed: 'WeCom access_token алу сәтсіз аяқталды: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'WeCom пайдаланушы жеке басын алу сәтсіз аяқталды: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo userid/openid қайтармады',
  refresh_unsupported: 'WeCom веб рұқсаты пайдаланушы деңгейіндегі refresh қолдамайды',
  revoke_unsupported: 'WeCom веб рұқсаты revoke қолдамайды',
});
