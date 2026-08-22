import { getMessageChannelListenerInjectable } from "@kubesightapp/messaging";
import { mcpServerStatusChangedChannel } from "../common/channels";
import currentlyInClusterFrameInjectable from "../../../renderer/routes/currently-in-cluster-frame.injectable";
import mcpServerStatusInjectable from "./server-status.injectable";

/**
 * Keeps Preferences honest while it is open: a client the user just authorised, or an endpoint that
 * just came up, shows without anyone reopening the page.
 */
const mcpServerStatusChangedListenerInjectable = getMessageChannelListenerInjectable({
  id: "mcp-server-status-changed-listener",
  channel: mcpServerStatusChangedChannel,

  getHandler: (di) => {
    const currentlyInClusterFrame = di.inject(currentlyInClusterFrameInjectable);
    const status = di.inject(mcpServerStatusInjectable);

    return () => {
      // Only the root frame has Preferences, so only it has a reason to ask.
      if (currentlyInClusterFrame) {
        return;
      }

      void status.refresh();
    };
  },
});

export default mcpServerStatusChangedListenerInjectable;
