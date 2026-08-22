import { getMessageChannel, getRequestChannel } from "@kubesightapp/messaging";

/**
 * A change an assistant wants to make, described in the terms the user has to weigh it in.
 */
export interface McpConfirmation {
  id: string;
  tool: string;
  cluster: string;
  target: string;
  action: string;
}

/**
 * An MCP client asking, through OAuth, to be let in at all. Raised while its `/authorize` request
 * is still open, so the answer here is what decides the redirect the client gets back.
 */
export interface McpAuthorizationRequest {
  id: string;
  clientName: string;
  redirectUri: string;
  clientUri?: string;
}

export interface McpPromptAnswer {
  id: string;
  approved: boolean;
}

/*
 * Prompts travel as a message out and a request back rather than as one request to the renderer:
 * main cannot request from a renderer, only the other way around.
 */
export const mcpConfirmationRequestedChannel = getMessageChannel<McpConfirmation>("mcp-confirmation-requested");

export const mcpAuthorizationRequestedChannel = getMessageChannel<McpAuthorizationRequest>(
  "mcp-authorization-requested",
);

/** Both kinds of prompt are settled by id, so one channel carries either answer back. */
export const mcpPromptAnsweredChannel = getRequestChannel<McpPromptAnswer, void>("mcp-prompt-answered");

export interface McpAuthorizedClient {
  clientId: string;
  name: string;
  redirectUris: string[];
  clientUri?: string;
  authorizedAt: number;
}

export interface McpServerStatus {
  isRunning: boolean;
  url: string;
  clients: McpAuthorizedClient[];
}

export const mcpServerStatusChannel = getRequestChannel<void, McpServerStatus>("mcp-server-status");

/** Told, not given the new status: the renderer asks for it, so there is one way to read it. */
export const mcpServerStatusChangedChannel = getMessageChannel<void>("mcp-server-status-changed");

export const mcpRevokeClientChannel = getRequestChannel<string, void>("mcp-revoke-client");
