import { observableHistoryInjectionToken } from "@kubesightapp/routing";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";

const currentPathInjectable = getInjectable({
  id: "current-path",

  instantiate: (di) => {
    const observableHistory = di.inject(observableHistoryInjectionToken);

    return computed(() => observableHistory.location.pathname);
  },
});

export default currentPathInjectable;
