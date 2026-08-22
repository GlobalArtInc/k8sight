import { loggerInjectionToken } from "@kubesightapp/logger";
import { sendMessageToChannelInjectionToken } from "@kubesightapp/messaging";
import { getRandomIdInjectionToken } from "@kubesightapp/random";
import { getInjectable } from "@ogre-tools/injectable";
import { createHash } from "crypto";
import { mcpServerStatusChangedChannel } from "../common/channels";
import {
  mcpAccessTokenLifetimeSeconds,
  mcpServerOrigin,
  mcpServerScope,
  mcpServerUrl,
} from "../common/vars";
import { McpOAuthError } from "./oauth-errors";
import mcpOAuthStoreInjectable from "./oauth-store.injectable";
import { withRedirectParams } from "./redirect-uri";
import requestMcpAuthorizationInjectable from "./request-authorization.injectable";

import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";

import type {
  OAuthClientInformationFull,
  OAuthClientMetadata,
  OAuthTokens,
} from "@modelcontextprotocol/sdk/shared/auth.js";

import type { McpAuthorizedClient } from "../common/channels";
import type { McpStoredClient } from "./oauth-store.injectable";

/** The subset of `AuthorizationParams` from the SDK's `OAuthServerProvider` that we act on. */
export interface McpAuthorizationParams {
  state?: string;
  scopes?: string[];
  codeChallenge: string;
  redirectUri: string;
  resource?: string;
}

export interface McpOAuthProvider {
  registerClient: (metadata: OAuthClientMetadata) => OAuthClientInformationFull;
  getClient: (clientId: string) => OAuthClientInformationFull | undefined;
  /** Resolves with the URL the user agent must be sent to, approved or not. */
  authorize: (client: OAuthClientInformationFull, params: McpAuthorizationParams) => Promise<string>;
  exchangeAuthorizationCode: (
    client: OAuthClientInformationFull,
    code: string,
    codeVerifier: string,
    redirectUri: string | undefined,
    resource: string | undefined,
  ) => OAuthTokens;
  exchangeRefreshToken: (
    client: OAuthClientInformationFull,
    refreshToken: string,
    resource: string | undefined,
  ) => OAuthTokens;
  verifyAccessToken: (token: string) => AuthInfo | undefined;
  revokeToken: (client: OAuthClientInformationFull, token: string) => void;
  /** Cuts a client off from Preferences: no token of its survives, and it must be approved again. */
  revokeClient: (clientId: string) => boolean;
  listAuthorizedClients: () => McpAuthorizedClient[];
}

interface IssuedAuthorizationCode {
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
  scopes: string[];
  resource?: string;
  expiresAt: number;
}

interface IssuedAccessToken {
  clientId: string;
  scopes: string[];
  expiresAt: number;
}

/** An authorization code is redeemed within seconds of being issued; anything slower is suspect. */
const authorizationCodeLifetimeMs = 5 * 60 * 1000;

/*
 * RFC 8707: a token must be bound to the resource it was asked for, so a client cannot get one here
 * and spend it somewhere else. Clients differ on whether they name the endpoint or the origin.
 */
const isOurResource = (resource: string) => {
  try {
    const asked = new URL(resource);

    asked.hash = "";

    return asked.href === mcpServerUrl || asked.href === `${mcpServerOrigin}/` || asked.href === mcpServerOrigin;
  } catch {
    return false;
  }
};

const mcpOAuthProviderInjectable = getInjectable({
  id: "mcp-oauth-provider",

  instantiate: (di): McpOAuthProvider => {
    const store = di.inject(mcpOAuthStoreInjectable);
    const requestAuthorization = di.inject(requestMcpAuthorizationInjectable);
    const getRandomId = di.inject(getRandomIdInjectionToken);
    const sendMessageToChannel = di.inject(sendMessageToChannelInjectionToken);
    const logger = di.inject(loggerInjectionToken);

    // Two v4 UUIDs of entropy, which is well past what a bearer credential needs.
    const newSecret = () => `${getRandomId()}${getRandomId()}`.replace(/-/g, "");

    const codes = new Map<string, IssuedAuthorizationCode>();

    /*
     * Access tokens live only here: losing them on restart costs an approved client one silent
     * refresh, and it means a process that reads the store file still cannot talk to the endpoint.
     */
    const accessTokens = new Map<string, IssuedAccessToken>();

    const asClientInformation = (client: McpStoredClient): OAuthClientInformationFull => ({
      client_id: client.clientId,
      client_secret: client.clientSecret,
      client_id_issued_at: Math.floor(client.registeredAt / 1000),
      // Never expires: re-issuing a secret would silently break a client the user already approved.
      client_secret_expires_at: client.clientSecret ? 0 : undefined,
      client_name: client.name,
      client_uri: client.clientUri,
      redirect_uris: client.redirectUris,
      token_endpoint_auth_method: client.tokenEndpointAuthMethod,
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      scope: mcpServerScope,
    });

    const notifyStatusChanged = () => sendMessageToChannel(mcpServerStatusChangedChannel);

    const forgetAccessTokensOf = (clientId: string) => {
      for (const [token, issued] of accessTokens) {
        if (issued.clientId === clientId) {
          accessTokens.delete(token);
        }
      }
    };

    const issueTokens = (clientId: string, scopes: string[]): OAuthTokens => {
      const accessToken = newSecret();
      const refreshToken = newSecret();

      accessTokens.set(accessToken, {
        clientId,
        scopes,
        expiresAt: Date.now() + mcpAccessTokenLifetimeSeconds * 1000,
      });

      store.addRefreshToken(clientId, refreshToken);

      return {
        access_token: accessToken,
        token_type: "Bearer",
        expires_in: mcpAccessTokenLifetimeSeconds,
        refresh_token: refreshToken,
        scope: scopes.join(" "),
      };
    };

    return {
      registerClient: (metadata) => {
        if (metadata.redirect_uris.length === 0) {
          throw new McpOAuthError("invalid_client_metadata", "At least one redirect_uri is required");
        }

        // Checked here so that later, when one has to be redirected to, it is known to parse.
        if (!metadata.redirect_uris.every((uri) => URL.canParse(uri))) {
          throw new McpOAuthError("invalid_client_metadata", "Every redirect_uri must be an absolute URI");
        }

        const isPublicClient = metadata.token_endpoint_auth_method === "none";

        const client: McpStoredClient = {
          clientId: getRandomId(),
          clientSecret: isPublicClient ? undefined : newSecret(),
          name: metadata.client_name || "Unnamed MCP client",
          redirectUris: metadata.redirect_uris,
          clientUri: metadata.client_uri,
          tokenEndpointAuthMethod: metadata.token_endpoint_auth_method ?? "client_secret_post",
          registeredAt: Date.now(),
          refreshTokens: [],
        };

        store.add(client);
        logger.info(`[MCP-SERVER]: client "${client.name}" registered, awaiting approval`);

        return asClientInformation(client);
      },

      getClient: (clientId) => {
        const client = store.get(clientId);

        return client && asClientInformation(client);
      },

      authorize: async (client, params) => {
        if (params.resource !== undefined && !isOurResource(params.resource)) {
          throw new McpOAuthError("invalid_target", "The requested resource is not served here");
        }

        const stored = store.get(client.client_id);

        if (!stored) {
          throw new McpOAuthError("invalid_client", "Unknown client");
        }

        /*
         * Asked every time rather than only on first sight: a client that was already approved
         * refreshes its token instead of coming back here, so a second visit is worth a look.
         */
        const approved = await requestAuthorization({
          clientName: stored.name,
          redirectUri: params.redirectUri,
          clientUri: stored.clientUri,
        });

        if (!approved) {
          logger.info(`[MCP-SERVER]: client "${stored.name}" was denied`);

          return withRedirectParams(params.redirectUri, {
            error: "access_denied",
            error_description: "The request was denied in k8sight",
            state: params.state,
          });
        }

        store.approve(stored.clientId);
        notifyStatusChanged();

        const code = newSecret();

        codes.set(code, {
          clientId: stored.clientId,
          redirectUri: params.redirectUri,
          codeChallenge: params.codeChallenge,
          scopes: params.scopes?.length ? params.scopes : [mcpServerScope],
          resource: params.resource,
          expiresAt: Date.now() + authorizationCodeLifetimeMs,
        });

        logger.info(`[MCP-SERVER]: client "${stored.name}" was approved`);

        return withRedirectParams(params.redirectUri, { code, state: params.state });
      },

      exchangeAuthorizationCode: (client, code, codeVerifier, redirectUri, resource) => {
        const issued = codes.get(code);

        // Single use, whatever the outcome: a replayed code must never mint a second token.
        codes.delete(code);

        if (!issued || issued.expiresAt < Date.now()) {
          throw new McpOAuthError("invalid_grant", "The authorization code is invalid or has expired");
        }

        if (issued.clientId !== client.client_id) {
          throw new McpOAuthError("invalid_grant", "The authorization code was issued to another client");
        }

        if (redirectUri !== undefined && redirectUri !== issued.redirectUri) {
          throw new McpOAuthError("invalid_grant", "redirect_uri does not match the authorization request");
        }

        if (resource !== undefined && resource !== issued.resource && !isOurResource(resource)) {
          throw new McpOAuthError("invalid_target", "The requested resource is not served here");
        }

        const challenge = createHash("sha256").update(codeVerifier).digest("base64url");

        if (challenge !== issued.codeChallenge) {
          throw new McpOAuthError("invalid_grant", "code_verifier does not match the challenge");
        }

        return issueTokens(issued.clientId, issued.scopes);
      },

      exchangeRefreshToken: (client, refreshToken, resource) => {
        if (resource !== undefined && !isOurResource(resource)) {
          throw new McpOAuthError("invalid_target", "The requested resource is not served here");
        }

        // Rotated on every use, so a leaked refresh token is good for one exchange at most.
        const owner = store.consumeRefreshToken(refreshToken);

        if (!owner || owner.clientId !== client.client_id) {
          throw new McpOAuthError("invalid_grant", "The refresh token is invalid or has been revoked");
        }

        if (!owner.approvedAt) {
          throw new McpOAuthError("invalid_grant", "This client is no longer authorized");
        }

        return issueTokens(owner.clientId, [mcpServerScope]);
      },

      verifyAccessToken: (token) => {
        const issued = accessTokens.get(token);

        if (!issued) {
          return undefined;
        }

        if (issued.expiresAt < Date.now()) {
          accessTokens.delete(token);

          return undefined;
        }

        // Belt and braces: revoking a client empties this map, but a stale entry must not pass.
        if (!store.get(issued.clientId)?.approvedAt) {
          accessTokens.delete(token);

          return undefined;
        }

        return {
          token,
          clientId: issued.clientId,
          scopes: issued.scopes,
          expiresAt: Math.floor(issued.expiresAt / 1000),
        };
      },

      revokeToken: (client, token) => {
        const issued = accessTokens.get(token);

        // RFC 7009: revoking a token that is not there, or not the caller's, is not an error.
        if (issued?.clientId === client.client_id) {
          accessTokens.delete(token);
        }

        const owner = store.get(client.client_id);

        if (owner?.refreshTokens.includes(token)) {
          store.dropRefreshToken(token);
        }
      },

      revokeClient: (clientId) => {
        forgetAccessTokensOf(clientId);

        for (const [code, issued] of codes) {
          if (issued.clientId === clientId) {
            codes.delete(code);
          }
        }

        const removed = store.remove(clientId);

        if (removed) {
          notifyStatusChanged();
        }

        return removed;
      },

      listAuthorizedClients: () =>
        store
          .list()
          .filter((client): client is McpStoredClient & { approvedAt: number } => client.approvedAt !== undefined)
          .map((client) => ({
            clientId: client.clientId,
            name: client.name,
            redirectUris: client.redirectUris,
            clientUri: client.clientUri,
            authorizedAt: client.approvedAt,
          })),
    };
  },
});

export default mcpOAuthProviderInjectable;
