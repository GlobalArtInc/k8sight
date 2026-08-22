import { loggerInjectionToken } from "@kubesightapp/logger";
import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import { mcpRevokeClientChannel } from "../common/channels";
import mcpOAuthProviderInjectable from "./oauth-provider.injectable";

const mcpRevokeClientListenerInjectable = getRequestChannelListenerInjectable({
  id: "mcp-revoke-client-listener",
  channel: mcpRevokeClientChannel,

  getHandler: (di) => {
    const provider = di.inject(mcpOAuthProviderInjectable);
    const logger = di.inject(loggerInjectionToken);

    return (clientId) => {
      if (provider.revokeClient(clientId)) {
        logger.info(`[MCP-SERVER]: access for client ${clientId} was revoked`);
      }
    };
  },
});

export default mcpRevokeClientListenerInjectable;
