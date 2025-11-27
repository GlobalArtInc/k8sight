import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { ClusterId } from "../../common/cluster-types";

const visibleClusterInjectable = getInjectable({
  id: "visible-cluster",
  instantiate: () => observable.box<ClusterId | null>(null),
});

export default visibleClusterInjectable;
