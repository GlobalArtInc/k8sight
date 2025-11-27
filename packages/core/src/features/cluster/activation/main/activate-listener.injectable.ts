import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import { activateClusterChannel } from "../common/channels";
import requestClusterActivationInjectable from "./request-activation.injectable";

const activateClusterRequestChannelListenerInjectable = getRequestChannelListenerInjectable({
  id: "activate-cluster-request-channel-listener",
  channel: activateClusterChannel,
  getHandler: (di) => di.inject(requestClusterActivationInjectable),
});

export default activateClusterRequestChannelListenerInjectable;
