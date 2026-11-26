import type { BrowserProxy } from './types';

const INVALID_DIR_CHARS = /[<>:"/\\|?*\u0000-\u001f]/g;

/** 净化为可用的会话目录名 */
export function sanitizeUserDataDirName(dir: string | undefined): string {
  let sanitized = dir || 'default';
  sanitized = sanitized.replaceAll(INVALID_DIR_CHARS, '_').replace(/[.\s]+$/, '');
  return sanitized && sanitized !== '.' && sanitized !== '..' ? sanitized : 'default';
}

export function mergeProxy(
  base: BrowserProxy | undefined,
  auth: { username: string; password: string } | undefined,
): BrowserProxy | undefined {
  if (!base && !auth) return undefined;
  return {
    ...base,
    ...(auth?.username
      ? { username: auth.username, password: auth.password ?? '' }
      : null),
  };
}

/** 将 `BrowserProxy` 转为 Playwright `proxy`；无效则返回 `undefined` */
export function toPlaywrightProxy(
  proxy: BrowserProxy | undefined,
): { server: string; username?: string; password?: string } | undefined {
  if (!proxy) return undefined;
  const server = proxy.server?.trim()
    ? proxy.server.trim()
    : proxy.host && proxy.port != null
      ? `http://${proxy.host}:${proxy.port}`
      : undefined;
  if (!server) return undefined;
  return {
    server,
    ...(proxy.username
      ? { username: proxy.username, password: proxy.password ?? '' }
      : null),
  };
}

export function chromeUserAgentFromVersion(version: string): string {
  const chromeVersion = version.replace(/^Chrome\//i, '').split(' ')[0] || version;
  return `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`;
}
