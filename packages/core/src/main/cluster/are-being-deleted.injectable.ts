import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { ClusterId } from "../../common/cluster-types";

const clustersThatAreBeingDeletedInjectable = getInjectable({
  id: "clusters-that-are-being-deleted",
  instantiate: () => observable.set<ClusterId>(),
});

export default clustersThatAreBeingDeletedInjectable;
