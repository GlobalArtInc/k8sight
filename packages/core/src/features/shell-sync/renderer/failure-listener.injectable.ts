import { getMessageChannelListenerInjectable } from "@kubesightapp/messaging";
import { showErrorNotificationInjectable } from "@kubesightapp/notifications";
import { shellSyncFailedChannel } from "../common/failure-channel";

const shellSyncFailureListenerInjectable = getMessageChannelListenerInjectable({
  id: "notification",
  channel: shellSyncFailedChannel,
  getHandler: (di) => {
    const showErrorNotification = di.inject(showErrorNotificationInjectable);

    return (errorMessage) => showErrorNotification(`Failed to sync shell environment: ${errorMessage}`);
  },
});

export default shellSyncFailureListenerInjectable;
