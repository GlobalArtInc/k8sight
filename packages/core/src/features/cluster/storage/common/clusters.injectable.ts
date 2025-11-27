import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import clustersStateInjectable from "./state.injectable";

const clustersInjectable = getInjectable({
  id: "clusters",
  instantiate: (di) => {
    const clustersState = di.inject(clustersStateInjectable);

    return computed(() => [...clustersState.values()]);
  },
});

export default clustersInjectable;
