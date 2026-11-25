import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ml-IN */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] ബ്രൗസർ തയ്യാറല്ല അല്ലെങ്കിൽ കണക്ഷൻ വിച്ഛേദിച്ചു',
  close_browser_timeout: 'ബ്രൗസർ അടയ്ക്കുമ്പോൾ സമയം കഴിഞ്ഞു',
  close_browser_failed: '[Playwright] അടയ്ക്കൽ പരാജയപ്പെട്ടു, നിർബന്ധിച്ച് നിർത്തുന്നു: {{message}}',
  force_kill_browser: '[Playwright] Chromium പ്രോസസ് നിർബന്ധിച്ച് നിർത്തി pid={{pid}}',
  force_kill_failed: '[Playwright] നിർബന്ധിത നിർത്തൽ പരാജയപ്പെട്ടു: {{message}}',
  close_context_timeout: 'Context അടയ്ക്കുമ്പോൾ സമയം കഴിഞ്ഞു',
  close_context_failed: '[Playwright] Context അടയ്ക്കൽ പരാജയപ്പെട്ടു: {{message}}',
  xvfb_exited: 'Xvfb അവസാനിച്ചു, code={{code}}',
  xvfb_start_failed: 'Xvfb ആരംഭിക്കാനായില്ല',
  max_concurrent_invalid: 'maxConcurrent 1 അല്ലെങ്കിൽ അതിലധികം ഒരു പൂർണ്ണസംഖ്യയായിരിക്കണം',
});
