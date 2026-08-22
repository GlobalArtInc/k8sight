/**
 * The MCP endpoint listens on loopback only: it hands out whatever access the user's kubeconfigs
 * carry, so it must never be reachable from the network.
 */
export const mcpServerHost = "127.0.0.1";

export const mcpServerPort = 9292;

export const mcpServerPath = "/mcp";

export const mcpServerOrigin = `http://${mcpServerHost}:${mcpServerPort}`;

/** The one string a user has to paste into an MCP client. */
export const mcpServerUrl = `${mcpServerOrigin}${mcpServerPath}`;

/**
 * k8sight is both the resource server and its own authorization server, so every OAuth endpoint
 * lives on the same loopback origin as the MCP endpoint itself.
 */
export const mcpOAuthPaths = {
  authorize: "/authorize",
  token: "/token",
  register: "/register",
  revoke: "/revoke",
  authorizationServerMetadata: "/.well-known/oauth-authorization-server",
  /** RFC 9728 puts the resource's path after the well-known prefix. */
  protectedResourceMetadata: `/.well-known/oauth-protected-resource${mcpServerPath}`,
} as const;

export const mcpProtectedResourceMetadataUrl = `${mcpServerOrigin}${mcpOAuthPaths.protectedResourceMetadata}`;

/**
 * A single scope: an approved client gets everything the tools expose, and every change to a
 * cluster is confirmed in the app anyway, so finer scopes would only be theatre.
 */
export const mcpServerScope = "k8sight";

export const mcpAccessTokenLifetimeSeconds = 60 * 60;
