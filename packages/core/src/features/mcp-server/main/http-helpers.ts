import type { IncomingMessage, ServerResponse } from "http";

/** Any legitimate OAuth body is a few hundred bytes; the cap is only there to stop a runaway one. */
const maxBodyBytes = 64 * 1024;

export const readBody = (req: IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;

    req.on("data", (chunk: Buffer) => {
      size += chunk.length;

      if (size > maxBodyBytes) {
        reject(new Error("Request body is too large"));
        req.destroy();

        return;
      }

      chunks.push(chunk);
    });

    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    req.on("error", reject);
  });

export const parseFormBody = (body: string): Record<string, string> =>
  Object.fromEntries(new URLSearchParams(body).entries());

export const parseQuery = (req: IncomingMessage): Record<string, string> =>
  Object.fromEntries(new URL(req.url ?? "/", "http://localhost").searchParams.entries());

export const pathnameOf = (req: IncomingMessage) => new URL(req.url ?? "/", "http://localhost").pathname;

/*
 * Browser-based MCP clients reach the endpoint from a page origin, so the preflight has to pass.
 * Handing out `*` costs nothing here: every request still has to carry a bearer token that only an
 * approved client has, and the browser's own origin never grants one.
 */
export const applyCorsHeaders = (res: ServerResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Mcp-Session-Id, MCP-Protocol-Version");
  res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id, WWW-Authenticate");
};

export const sendJson = (res: ServerResponse, status: number, body: unknown) => {
  res
    .writeHead(status, {
      "content-type": "application/json",
      "cache-control": "no-store",
    })
    .end(JSON.stringify(body));
};

export const sendRedirect = (res: ServerResponse, location: string) => {
  res.writeHead(302, { location, "cache-control": "no-store" }).end();
};

/**
 * Reads `client_secret_basic` credentials, which some clients use instead of putting them in the body.
 */
export const parseBasicAuth = (header: string | undefined) => {
  if (!header?.toLowerCase().startsWith("basic ")) {
    return undefined;
  }

  const decoded = Buffer.from(header.slice("basic ".length), "base64").toString("utf-8");
  const separator = decoded.indexOf(":");

  if (separator < 0) {
    return undefined;
  }

  return {
    clientId: decodeURIComponent(decoded.slice(0, separator)),
    clientSecret: decodeURIComponent(decoded.slice(separator + 1)),
  };
};
