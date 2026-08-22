import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import { mcpServerStatusChannel } from "../common/channels";
import { mcpServerUrl } from "../common/vars";
import mcpOAuthProviderInjectable from "./oauth-provider.injectable";
import mcpHttpServerInjectable from "./server.injectable";

/**
 * What Preferences is allowed to know: no client secrets, no tokens.
 */
const mcpServerStatusListenerInjectable = getRequestChannelListenerInjectable({
  id: "mcp-server-status-listener",
  channel: mcpServerStatusChannel,

  getHandler: (di) => {
    const server = di.inject(mcpHttpServerInjectable);
    const provider = di.inject(mcpOAuthProviderInjectable);

    return () => ({
      isRunning: server.isRunning(),
      url: mcpServerUrl,
      clients: provider.listAuthorizedClients(),
    });
  },
});

export default mcpServerStatusListenerInjectable;
