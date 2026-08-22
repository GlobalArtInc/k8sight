import { getMessageChannelListenerInjectable, requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import React from "react";
import { mcpConfirmationRequestedChannel, mcpPromptAnsweredChannel } from "../common/channels";
import confirmInjectable from "../../../renderer/components/confirm-dialog/confirm.injectable";
import currentlyInClusterFrameInjectable from "../../../renderer/routes/currently-in-cluster-frame.injectable";

const mcpConfirmationListenerInjectable = getMessageChannelListenerInjectable({
  id: "mcp-confirmation-listener",
  channel: mcpConfirmationRequestedChannel,

  getHandler: (di) => {
    const currentlyInClusterFrame = di.inject(currentlyInClusterFrameInjectable);
    const confirm = di.inject(confirmInjectable);
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);

    return ({ id, tool, cluster, target, action }) => {
      // Every frame is told; only the root frame asks, so the user sees one dialog and answers once.
      if (currentlyInClusterFrame) {
        return;
      }

      void (async () => {
        const approved = await confirm({
          labelOk: "Allow",
          labelCancel: "Deny",
          message: (
            <>
              <p>
                An AI assistant wants to run <b>{tool}</b> on <b>{cluster}</b>.
              </p>
              <p>
                {action}: <b>{target}</b>
              </p>
            </>
          ),
        });

        await requestFromChannel(mcpPromptAnsweredChannel, { id, approved });
      })();
    };
  },
});

export default mcpConfirmationListenerInjectable;
