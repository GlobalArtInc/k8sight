import { observableHistoryInjectionToken } from "@kubesightapp/routing";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { parse as parseQueryString } from "query-string";

const queryParametersInjectable = getInjectable({
  id: "query-parameters",

  instantiate: (di) => {
    const observableHistory = di.inject(observableHistoryInjectionToken);

    return computed(() => parseQueryString(observableHistory.location.search));
  },
});

export default queryParametersInjectable;
