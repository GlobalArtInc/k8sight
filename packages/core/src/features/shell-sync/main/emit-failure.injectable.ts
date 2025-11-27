import { sendMessageToChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { shellSyncFailedChannel } from "../common/failure-channel";

const emitShellSyncFailedInjectable = getInjectable({
  id: "emit-shell-sync-failed",
  instantiate: (di) => {
    const sendMessageToChannel = di.inject(sendMessageToChannelInjectionToken);

    return (error: string) => sendMessageToChannel(shellSyncFailedChannel, error);
  },
});

export default emitShellSyncFailedInjectable;
