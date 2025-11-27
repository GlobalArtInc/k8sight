import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import weblinksStateInjectable from "./state.injectable";

const weblinksInjectable = getInjectable({
  id: "weblinks",
  instantiate: (di) => {
    const state = di.inject(weblinksStateInjectable);

    return computed(() => [...state.values()]);
  },
});

export default weblinksInjectable;
