import type { MessageChannel, RequestChannel } from "@kubesightapp/messaging";

import type { ClusterId, ClusterState } from "../../../../common/cluster-types";

export interface ClusterStateSync {
  clusterId: ClusterId;
  state: ClusterState;
}

export const clusterStateSyncChannel: MessageChannel<ClusterStateSync> = {
  id: "cluster-state-sync",
};

export const initialClusterStatesChannel: RequestChannel<void, ClusterStateSync[]> = {
  id: "initial-cluster-state-sync",
};
