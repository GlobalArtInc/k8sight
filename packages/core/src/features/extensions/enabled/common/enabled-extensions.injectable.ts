import { iter } from "@kubesightapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import enabledExtensionsStateInjectable from "./state.injectable";

const enabledExtensionsInjectable = getInjectable({
  id: "enabled-extensions",
  instantiate: (di) => {
    const state = di.inject(enabledExtensionsStateInjectable);

    return computed(() =>
      iter
        .chain(state.values())
        .filter(({ enabled }) => enabled)
        .map(({ name }) => name)
        .toArray(),
    );
  },
});

export default enabledExtensionsInjectable;
