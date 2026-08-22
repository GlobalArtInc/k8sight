import { getMessageChannelListenerInjectable, requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import React from "react";
import confirmInjectable from "../../../renderer/components/confirm-dialog/confirm.injectable";
import currentlyInClusterFrameInjectable from "../../../renderer/routes/currently-in-cluster-frame.injectable";
import { mcpAuthorizationRequestedChannel, mcpPromptAnsweredChannel } from "../common/channels";

/**
 * The consent step of the OAuth flow, asked here instead of on a web page: the user is deciding
 * whether to hand out their clusters, and k8sight is the only party in the exchange they can trust.
 */
const mcpAuthorizationListenerInjectable = getMessageChannelListenerInjectable({
  id: "mcp-authorization-listener",
  channel: mcpAuthorizationRequestedChannel,

  getHandler: (di) => {
    const currentlyInClusterFrame = di.inject(currentlyInClusterFrameInjectable);
    const confirm = di.inject(confirmInjectable);
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);

    return ({ id, clientName, redirectUri, clientUri }) => {
      // Every frame is told; only the root frame asks, so the user sees one dialog and answers once.
      if (currentlyInClusterFrame) {
        return;
      }

      void (async () => {
        const approved = await confirm({
          labelOk: "Authorize",
          labelCancel: "Deny",
          message: (
            <>
              <p>
                <b>{clientName}</b> wants to connect to K8Sight.
              </p>
              <p>
                It will be able to read every cluster K8Sight is connected to. Changing a cluster still asks you here,
                each time.
              </p>
              {/* The redirect URI is the one thing that says which program is really at the other end. */}
              <p className="hint">
                Redirects to <b>{redirectUri}</b>
                {clientUri && (
                  <>
                    {" from "}
                    <b>{clientUri}</b>
                  </>
                )}
              </p>
            </>
          ),
        });

        await requestFromChannel(mcpPromptAnsweredChannel, { id, approved });
      })();
    };
  },
});

export default mcpAuthorizationListenerInjectable;
