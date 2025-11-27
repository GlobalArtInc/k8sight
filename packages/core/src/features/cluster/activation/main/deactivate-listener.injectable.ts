import { getRequestChannelListenerInjectable } from "@kubesightapp/messaging";
import { deactivateClusterChannel } from "../common/channels";
import requestClusterDeactivationInjectable from "./request-deactivation.injectable";

const clusterDeactivationRequestChannelListenerInjectable = getRequestChannelListenerInjectable({
  id: "cluster-deactivation-request-channel-listener",
  channel: deactivateClusterChannel,
  getHandler: (di) => di.inject(requestClusterDeactivationInjectable),
});

export default clusterDeactivationRequestChannelListenerInjectable;
