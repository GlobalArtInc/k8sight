import { getMessageChannelListenerInjectable } from "@kubesightapp/messaging";
import currentlyInClusterFrameInjectable from "../../../renderer/routes/currently-in-cluster-frame.injectable";
import { applicationUpdateStateChangedChannel } from "../common/channels";
import showApplicationUpdateNotificationInjectable from "./show-update-notification.injectable";

const applicationUpdateStateChangedListenerInjectable = getMessageChannelListenerInjectable({
  id: "application-update-state-changed-listener",
  channel: applicationUpdateStateChangedChannel,

  getHandler: (di) => {
    const currentlyInClusterFrame = di.inject(currentlyInClusterFrameInjectable);
    const showApplicationUpdateNotification = di.inject(showApplicationUpdateNotificationInjectable);

    return (state) => {
      // Every frame is told; only the root frame shows it, so the user is told once.
      if (currentlyInClusterFrame) {
        return;
      }

      showApplicationUpdateNotification(state);
    };
  },
});

export default applicationUpdateStateChangedListenerInjectable;
