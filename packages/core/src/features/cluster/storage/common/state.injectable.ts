import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { Cluster } from "../../../../common/cluster/cluster";
import type { ClusterId } from "../../../../common/cluster-types";

const clustersStateInjectable = getInjectable({
  id: "clusters-state",
  instantiate: () => observable.map<ClusterId, Cluster>(),
});

export default clustersStateInjectable;
