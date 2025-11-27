import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import topBarStateInjectable from "../../state.injectable";

const topBarNextEnabledInjectable = getInjectable({
  id: "top-bar-next-enabled",
  instantiate: (di) => {
    const state = di.inject(topBarStateInjectable);

    return computed(() => state.nextEnabled);
  },
});

export default topBarNextEnabledInjectable;
