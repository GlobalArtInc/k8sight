import { observableHistoryInjectionToken } from "@kubesightapp/routing";
import { getInjectable } from "@ogre-tools/injectable";
import { PageParam } from "./page-param";

import type { PageParamDependencies, PageParamInit } from "./page-param";

export type CreatePageParam = <Value = string>(init: PageParamInit<Value>) => PageParam<Value>;

const createPageParamInjectable = getInjectable({
  id: "create-page-param",
  instantiate: (di): CreatePageParam => {
    const deps: PageParamDependencies = {
      history: di.inject(observableHistoryInjectionToken),
    };

    return (init) => new PageParam(deps, init);
  },
});

export default createPageParamInjectable;
