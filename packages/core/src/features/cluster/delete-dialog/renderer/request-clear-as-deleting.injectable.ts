import { requestFromChannelInjectionToken } from "@kubesightapp/messaging";
import { getInjectable } from "@ogre-tools/injectable";
import { clearClusterAsDeletingChannel } from "../common/clear-as-deleting-channel";

import type { ClusterId } from "../../../../common/cluster-types";

export type RequestClearClusterAsDeleting = (clusterId: ClusterId) => Promise<void>;

const requestClearClusterAsDeletingInjectable = getInjectable({
  id: "request-clear-cluster-as-deleting",
  instantiate: (di): RequestClearClusterAsDeleting => {
    const requestChannel = di.inject(requestFromChannelInjectionToken);

    return (clusterId) => requestChannel(clearClusterAsDeletingChannel, clusterId);
  },
});

export default requestClearClusterAsDeletingInjectable;
