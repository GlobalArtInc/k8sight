import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import { mcpOAuthPaths, mcpServerOrigin, mcpServerScope, mcpServerUrl } from "../common/vars";
import {
  parseBasicAuth,
  parseFormBody,
  parseQuery,
  pathnameOf,
  readBody,
  sendJson,
  sendRedirect,
} from "./http-helpers";
import { isMcpOAuthError, McpOAuthError } from "./oauth-errors";
import mcpOAuthProviderInjectable from "./oauth-provider.injectable";
import { redirectUriMatches, withRedirectParams } from "./redirect-uri";
import type { IncomingMessage, ServerResponse } from "http";

import type {
  OAuthClientInformationFull,
  OAuthClientMetadata,
  OAuthMetadata,
  OAuthProtectedResourceMetadata,
} from "@modelcontextprotocol/sdk/shared/auth.js";

/** Answers the request if it is one of ours, and says so; anything else is left to the caller. */
export type HandleMcpOAuthRequest = (req: IncomingMessage, res: ServerResponse) => Promise<boolean>;

interface Route {
  methods: string[];
  handle: (req: IncomingMessage, res: ServerResponse) => Promise<void>;
}

const authorizationServerMetadata: OAuthMetadata = {
  issuer: mcpServerOrigin,
  authorization_endpoint: `${mcpServerOrigin}${mcpOAuthPaths.authorize}`,
  token_endpoint: `${mcpServerOrigin}${mcpOAuthPaths.token}`,
  registration_endpoint: `${mcpServerOrigin}${mcpOAuthPaths.register}`,
  revocation_endpoint: `${mcpServerOrigin}${mcpOAuthPaths.revoke}`,
  response_types_supported: ["code"],
  response_modes_supported: ["query"],
  grant_types_supported: ["authorization_code", "refresh_token"],
  token_endpoint_auth_methods_supported: ["none", "client_secret_post", "client_secret_basic"],
  revocation_endpoint_auth_methods_supported: ["none", "client_secret_post", "client_secret_basic"],
  // S256 only: OAuth 2.1 drops "plain", and every MCP client supports it.
  code_challenge_methods_supported: ["S256"],
  scopes_supported: [mcpServerScope],
};

const protectedResourceMetadata: OAuthProtectedResourceMetadata = {
  resource: mcpServerUrl,
  authorization_servers: [mcpServerOrigin],
  scopes_supported: [mcpServerScope],
  bearer_methods_supported: ["header"],
  resource_name: "k8sight",
};

const isNonEmptyString = (value: unknown): value is string => typeof value === "string" && value.length > 0;

const mcpOAuthEndpointsInjectable = getInjectable({
  id: "mcp-oauth-endpoints",

  instantiate: (di): HandleMcpOAuthRequest => {
    const provider = di.inject(mcpOAuthProviderInjectable);
    const logger = di.inject(loggerInjectionToken);

    const sendOAuthError = (res: ServerResponse, error: unknown) => {
      if (isMcpOAuthError(error)) {
        sendJson(res, error.status, error.toResponseObject());

        return;
      }

      logger.error(`[MCP-SERVER]: OAuth endpoint failed: ${error}`);
      sendJson(res, 500, { error: "server_error", error_description: "Internal Server Error" });
    };

    /**
     * RFC 6749 section 2.3: a client with a secret must present it, a public client must not be
     * asked for one.
     */
    const authenticateClient = (req: IncomingMessage, params: Record<string, string>): OAuthClientInformationFull => {
      const basic = parseBasicAuth(req.headers.authorization);
      const clientId = basic?.clientId ?? params.client_id;
      const clientSecret = basic?.clientSecret ?? params.client_secret;

      if (!isNonEmptyString(clientId)) {
        throw new McpOAuthError("invalid_client", "client_id is required", 401);
      }

      const client = provider.getClient(clientId);

      if (!client) {
        throw new McpOAuthError("invalid_client", "Unknown client", 401);
      }

      if (client.client_secret && client.client_secret !== clientSecret) {
        throw new McpOAuthError("invalid_client", "Invalid client_secret", 401);
      }

      return client;
    };

    const handleRegister = async (req: IncomingMessage, res: ServerResponse) => {
      let metadata: OAuthClientMetadata;

      try {
        metadata = JSON.parse(await readBody(req)) as OAuthClientMetadata;
      } catch {
        throw new McpOAuthError("invalid_client_metadata", "The registration body is not valid JSON");
      }

      if (!Array.isArray(metadata.redirect_uris) || !metadata.redirect_uris.every(isNonEmptyString)) {
        throw new McpOAuthError("invalid_client_metadata", "redirect_uris must be an array of URIs");
      }

      sendJson(res, 201, provider.registerClient(metadata));
    };

    const handleAuthorize = async (req: IncomingMessage, res: ServerResponse) => {
      const params = req.method === "POST" ? parseFormBody(await readBody(req)) : parseQuery(req);

      /*
       * Until client_id and redirect_uri check out there is nowhere safe to redirect to, so these
       * are answered straight to whatever opened the URL.
       */
      const client = isNonEmptyString(params.client_id) ? provider.getClient(params.client_id) : undefined;

      if (!client) {
        throw new McpOAuthError("invalid_client", "Unknown or missing client_id");
      }

      let redirectUri = params.redirect_uri;

      if (isNonEmptyString(redirectUri)) {
        const requested = redirectUri;

        if (!client.redirect_uris.some((registered) => redirectUriMatches(requested, registered))) {
          throw new McpOAuthError("invalid_request", "Unregistered redirect_uri");
        }
      } else if (client.redirect_uris.length === 1) {
        redirectUri = client.redirect_uris[0];
      } else {
        throw new McpOAuthError("invalid_request", "redirect_uri must be given when several are registered");
      }

      const target = redirectUri;

      // Past this point the client can be told what went wrong through its own redirect URI.
      const failWithRedirect = (code: string, description: string) =>
        sendRedirect(
          res,
          withRedirectParams(target, { error: code, error_description: description, state: params.state }),
        );

      if (params.response_type !== "code") {
        failWithRedirect("unsupported_response_type", "Only the authorization code flow is supported");

        return;
      }

      if (!isNonEmptyString(params.code_challenge) || params.code_challenge_method !== "S256") {
        failWithRedirect("invalid_request", "A PKCE code_challenge with method S256 is required");

        return;
      }

      try {
        sendRedirect(
          res,
          await provider.authorize(client, {
            state: params.state,
            scopes: isNonEmptyString(params.scope) ? params.scope.split(" ") : undefined,
            codeChallenge: params.code_challenge,
            redirectUri: target,
            resource: params.resource,
          }),
        );
      } catch (error) {
        if (isMcpOAuthError(error)) {
          failWithRedirect(error.code, error.message);

          return;
        }

        throw error;
      }
    };

    const handleToken = async (req: IncomingMessage, res: ServerResponse) => {
      const params = parseFormBody(await readBody(req));
      const client = authenticateClient(req, params);

      switch (params.grant_type) {
        case "authorization_code": {
          if (!isNonEmptyString(params.code) || !isNonEmptyString(params.code_verifier)) {
            throw new McpOAuthError("invalid_request", "code and code_verifier are required");
          }

          sendJson(
            res,
            200,
            provider.exchangeAuthorizationCode(
              client,
              params.code,
              params.code_verifier,
              params.redirect_uri,
              params.resource,
            ),
          );

          return;
        }

        case "refresh_token": {
          if (!isNonEmptyString(params.refresh_token)) {
            throw new McpOAuthError("invalid_request", "refresh_token is required");
          }

          sendJson(res, 200, provider.exchangeRefreshToken(client, params.refresh_token, params.resource));

          return;
        }

        default:
          throw new McpOAuthError("unsupported_grant_type", "The grant type is not supported here");
      }
    };

    const handleRevoke = async (req: IncomingMessage, res: ServerResponse) => {
      const params = parseFormBody(await readBody(req));
      const client = authenticateClient(req, params);

      if (!isNonEmptyString(params.token)) {
        throw new McpOAuthError("invalid_request", "token is required");
      }

      provider.revokeToken(client, params.token);
      sendJson(res, 200, {});
    };

    const routes: Record<string, Route> = {
      [mcpOAuthPaths.register]: { methods: ["POST"], handle: handleRegister },
      [mcpOAuthPaths.authorize]: { methods: ["GET", "POST"], handle: handleAuthorize },
      [mcpOAuthPaths.token]: { methods: ["POST"], handle: handleToken },
      [mcpOAuthPaths.revoke]: { methods: ["POST"], handle: handleRevoke },
    };

    /*
     * Clients ask for the resource metadata both with and without the resource path, and some
     * append it to the authorization-server document too; every spelling answers the same.
     */
    const metadataFor = (pathname: string) => {
      if (pathname.startsWith("/.well-known/oauth-protected-resource")) {
        return protectedResourceMetadata;
      }

      if (pathname.startsWith("/.well-known/oauth-authorization-server")) {
        return authorizationServerMetadata;
      }

      return undefined;
    };

    return async (req, res) => {
      const pathname = pathnameOf(req);
      const method = req.method ?? "GET";
      const metadata = metadataFor(pathname);

      if (metadata) {
        if (method === "GET") {
          sendJson(res, 200, metadata);
        } else {
          res.writeHead(405, { allow: "GET, OPTIONS" }).end();
        }

        return true;
      }

      const route = routes[pathname];

      if (!route) {
        return false;
      }

      if (!route.methods.includes(method)) {
        res.writeHead(405, { allow: `${route.methods.join(", ")}, OPTIONS` }).end();

        return true;
      }

      try {
        await route.handle(req, res);
      } catch (error) {
        sendOAuthError(res, error);
      }

      return true;
    };
  },
});

export default mcpOAuthEndpointsInjectable;
