import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import topBarStateInjectable from "../../state.injectable";

const topBarPrevEnabledInjectable = getInjectable({
  id: "top-bar-prev-enabled",
  instantiate: (di) => {
    const state = di.inject(topBarStateInjectable);

    return computed(() => state.prevEnabled);
  },
});

export default topBarPrevEnabledInjectable;
