import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { KubeConfig } from "@kubesightapp/kubernetes-client-node";

import type { Cluster } from "../../../common/cluster/cluster";

export interface DeleteClusterDialogState {
  config: KubeConfig;
  cluster: Cluster;
  showContextSwitch: boolean;
  newCurrentContext: string;
}

const deleteClusterDialogStateInjectable = getInjectable({
  id: "delete-cluster-dialog-state",
  instantiate: () => observable.box<DeleteClusterDialogState | undefined>(),
});

export default deleteClusterDialogStateInjectable;
