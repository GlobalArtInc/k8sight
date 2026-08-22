const loopbackHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);

/**
 * RFC 8252 section 7.3: a native client gets its loopback port from the OS, so the port may differ
 * from the one it registered. Everything else about the URI still has to match exactly.
 */
export const redirectUriMatches = (requested: string, registered: string) => {
  if (requested === registered) {
    return true;
  }

  let a: URL;
  let b: URL;

  try {
    a = new URL(requested);
    b = new URL(registered);
  } catch {
    return false;
  }

  if (!loopbackHosts.has(a.hostname) || !loopbackHosts.has(b.hostname)) {
    return false;
  }

  return a.protocol === b.protocol && a.hostname === b.hostname && a.pathname === b.pathname && a.search === b.search;
};

/**
 * Builds the URL the user agent is sent back to, leaving whatever the client already put in the
 * redirect URI intact.
 */
export const withRedirectParams = (redirectUri: string, params: Record<string, string | undefined>) => {
  const url = new URL(redirectUri);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      url.searchParams.set(key, value);
    }
  }

  return url.href;
};
