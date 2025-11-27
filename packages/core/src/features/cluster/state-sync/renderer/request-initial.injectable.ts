import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { initialClusterStatesChannel } from "../common/channels";

import type { RequestChannelHandler } from "@kubesightapp/messaging";

export type RequestInitialClusterStates = RequestChannelHandler<typeof initialClusterStatesChannel>;

const requestInitialClusterStatesInjectable = getInjectable({
  id: "request-initial-cluster-states",
  instantiate: (di): RequestInitialClusterStates => {
    const requestFromChannel = di.inject(requestFromChannelInjectionToken);

    return () => requestFromChannel(initialClusterStatesChannel);
  },
});

export default requestInitialClusterStatesInjectable;
