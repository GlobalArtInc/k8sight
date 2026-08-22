/**
 * The OAuth error codes this server can return, as RFC 6749 / RFC 7591 / RFC 9728 spell them.
 */
export type McpOAuthErrorCode =
  | "invalid_request"
  | "invalid_client"
  | "invalid_grant"
  | "invalid_scope"
  | "invalid_target"
  | "invalid_token"
  | "invalid_client_metadata"
  | "unsupported_grant_type"
  | "unsupported_response_type"
  | "access_denied"
  | "server_error";

/**
 * Carries the code and the status an endpoint should answer with.
 *
 * The SDK has its own error classes, but they live in an ESM-only module next to its Express
 * handlers; the wire format is three JSON fields, so a local class keeps the error paths synchronous.
 */
export class McpOAuthError extends Error {
  constructor(
    readonly code: McpOAuthErrorCode,
    message: string,
    readonly status = 400,
  ) {
    super(message);
    this.name = "McpOAuthError";
  }

  toResponseObject() {
    return {
      error: this.code,
      error_description: this.message,
    };
  }
}

export const isMcpOAuthError = (error: unknown): error is McpOAuthError => error instanceof McpOAuthError;
