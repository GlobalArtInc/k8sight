import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import userPreferencesStateInjectable from "./state.injectable";

const httpsProxyConfigurationInjectable = getInjectable({
  id: "https-proxy-configuration",
  instantiate: (di) => {
    const userStore = di.inject(userPreferencesStateInjectable);

    return computed(() => userStore.httpsProxy);
  },
});

export default httpsProxyConfigurationInjectable;
