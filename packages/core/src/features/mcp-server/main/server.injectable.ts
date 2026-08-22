import { loggerInjectionToken } from "@kubesightapp/logger";
import { sendMessageToChannelInjectionToken } from "@kubesightapp/messaging";
import { getRandomIdInjectionToken } from "@kubesightapp/random";
import { getInjectable } from "@ogre-tools/injectable";
import { createServer } from "http";
import { mcpServerStatusChangedChannel } from "../common/channels";
import { mcpProtectedResourceMetadataUrl, mcpServerHost, mcpServerPath, mcpServerPort } from "../common/vars";
import { applyCorsHeaders, pathnameOf, readBody, sendJson } from "./http-helpers";
import mcpOAuthEndpointsInjectable from "./oauth-endpoints.injectable";
import mcpOAuthProviderInjectable from "./oauth-provider.injectable";
import registerMcpToolsInjectable from "./tools.injectable";
import type { Server } from "http";

export interface McpHttpServer {
  start: () => Promise<void>;
  stop: () => Promise<void>;
  readonly isRunning: () => boolean;
}

const logPrefix = "[MCP-SERVER]:";

const mcpHttpServerInjectable = getInjectable({
  id: "mcp-http-server",

  instantiate: (di): McpHttpServer => {
    const logger = di.inject(loggerInjectionToken);
    const registerTools = di.inject(registerMcpToolsInjectable);
    const getRandomId = di.inject(getRandomIdInjectionToken);
    const handleOAuthRequest = di.inject(mcpOAuthEndpointsInjectable);
    const provider = di.inject(mcpOAuthProviderInjectable);
    const sendMessageToChannel = di.inject(sendMessageToChannelInjectionToken);

    let server: Server | undefined;

    return {
      isRunning: () => Boolean(server),

      start: async () => {
        if (server) {
          return;
        }

        // Imported lazily: the SDK is ESM-only and is of no use until the endpoint is switched on.
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");
        const { StreamableHTTPServerTransport } = await import("@modelcontextprotocol/sdk/server/streamableHttp.js");
        const { isInitializeRequest } = await import("@modelcontextprotocol/sdk/types.js");

        /*
         * One transport -- and one server on top of it -- per session.
         *
         * A transport built with a `sessionIdGenerator` is stateful: the first `initialize` binds a
         * session to it, and any later `initialize` is rejected with a 400. Sharing a single
         * transport therefore serves exactly one client, once: a second assistant, or the same one
         * reconnecting after re-authorising, is turned away.
         */
        const transports = new Map<string, InstanceType<typeof StreamableHTTPServerTransport>>();

        const openSession = async () => {
          // Annotated because the callback below refers to `transport` while it is still being built.
          const transport: InstanceType<typeof StreamableHTTPServerTransport> = new StreamableHTTPServerTransport({
            sessionIdGenerator: () => getRandomId(),
            onsessioninitialized: (sessionId) => {
              transports.set(sessionId, transport);
            },
          });

          transport.onclose = () => {
            if (transport.sessionId) {
              transports.delete(transport.sessionId);
            }
          };

          const mcpServer = new McpServer({ name: "k8sight", version: "1.0.0" });

          registerTools(mcpServer);
          await mcpServer.connect(transport);

          return transport;
        };

        server = createServer((req, res) => {
          void (async () => {
            applyCorsHeaders(res);

            if (req.method === "OPTIONS") {
              res.writeHead(204).end();

              return;
            }

            if (await handleOAuthRequest(req, res)) {
              return;
            }

            if (pathnameOf(req) !== mcpServerPath) {
              res.writeHead(404).end();

              return;
            }

            /*
             * The endpoint speaks for every cluster the user has, so a caller has to prove it is a
             * client the user approved in the app. Loopback alone is not enough: anything running
             * as the user could otherwise reach it.
             */
            const [scheme, token] = (req.headers.authorization ?? "").split(" ");
            const auth = scheme?.toLowerCase() === "bearer" && token ? provider.verifyAccessToken(token) : undefined;

            if (!auth) {
              /*
               * RFC 9728: the header is what turns a 401 into an offer to authorize -- it is how a
               * client that was only given the URL finds the flow and puts an "Authorize" button up.
               */
              res
                .writeHead(401, {
                  "content-type": "application/json",
                  "www-authenticate": `Bearer error="invalid_token", error_description="Authorization required", resource_metadata="${mcpProtectedResourceMetadataUrl}"`,
                })
                .end(JSON.stringify({ error: "invalid_token", error_description: "Authorization required" }));

              return;
            }

            const sessionId = req.headers["mcp-session-id"];
            const existing = typeof sessionId === "string" ? transports.get(sessionId) : undefined;

            if (existing) {
              await existing.handleRequest(req, res);

              return;
            }

            if (req.method !== "POST") {
              sendJson(res, 400, { error: "invalid_request", error_description: "Unknown or missing session" });

              return;
            }

            // Only `initialize` may arrive without a session; the body has to be read here to tell,
            // so it is handed on rather than left for the transport to re-read from a drained stream.
            const body: unknown = JSON.parse((await readBody(req)) || "null");

            if (!isInitializeRequest(body)) {
              sendJson(res, 400, {
                error: "invalid_request",
                error_description: "Unknown or missing session; send initialize first",
              });

              return;
            }

            await (await openSession()).handleRequest(req, res, body);
          })().catch((error) => {
            logger.error(`${logPrefix} request failed: ${error}`);

            if (!res.headersSent) {
              res.writeHead(500).end();
            }
          });
        });

        await new Promise<void>((resolve, reject) => {
          server?.once("error", reject);
          server?.listen(mcpServerPort, mcpServerHost, resolve);
        });

        logger.info(`${logPrefix} listening on http://${mcpServerHost}:${mcpServerPort}${mcpServerPath}`);
        sendMessageToChannel(mcpServerStatusChangedChannel);
      },

      stop: async () => {
        const running = server;

        server = undefined;

        if (!running) {
          return;
        }

        await new Promise<void>((resolve) => running.close(() => resolve()));
        logger.info(`${logPrefix} stopped`);
        sendMessageToChannel(mcpServerStatusChangedChannel);
      },
    };
  },
});

export default mcpHttpServerInjectable;
