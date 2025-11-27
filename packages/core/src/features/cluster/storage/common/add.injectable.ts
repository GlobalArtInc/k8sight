import { setAndGet } from "@kubesightapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";
import { action } from "mobx";
import emitAppEventInjectable from "../../../../common/app-event-bus/emit-event.injectable";
import { Cluster } from "../../../../common/cluster/cluster";
import clustersStateInjectable from "./state.injectable";

import type { ClusterModel } from "../../../../common/cluster-types";

export type AddCluster = (clusterModel: ClusterModel) => Cluster;

const addClusterInjectable = getInjectable({
  id: "add-cluster",
  instantiate: (di): AddCluster => {
    const clustersState = di.inject(clustersStateInjectable);
    const emitAppEvent = di.inject(emitAppEventInjectable);

    return action((clusterModel) => {
      emitAppEvent({ name: "cluster", action: "add" });

      return setAndGet(clustersState, clusterModel.id, new Cluster(clusterModel));
    });
  },
});

export default addClusterInjectable;
