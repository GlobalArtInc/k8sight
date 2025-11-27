import { getRequestChannel } from "@kubesightapp/messaging";

import type { ClusterId } from "../../../../common/cluster-types";

export interface ActivateCluster {
  clusterId: ClusterId;

  /**
   * @default false
   */
  force?: boolean;
}

export const activateClusterChannel = getRequestChannel<ActivateCluster, void>("activate-cluster");

export const deactivateClusterChannel = getRequestChannel<ClusterId, void>("deactivate-cluster");
