import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { deactivateClusterChannel } from "../common/channels";
import { requestClusterDeactivationInjectionToken } from "../common/request-token";

const requestClusterDeactivationInjectable = getInjectable({
  id: "request-cluster-deactivation",
  instantiate: (di) => {
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);

    return (clusterId) => requestFromChannel(deactivateClusterChannel, clusterId);
  },
  injectionToken: requestClusterDeactivationInjectionToken,
});

export default requestClusterDeactivationInjectable;
