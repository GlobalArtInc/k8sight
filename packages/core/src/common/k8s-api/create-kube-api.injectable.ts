import { maybeKubeApiInjectable } from "@kubesightapp/kube-api-specifics";
import { logErrorInjectionToken, logInfoInjectionToken, logWarningInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";

import type { DerivedKubeApiOptions, KubeApiDependencies } from "@kubesightapp/kube-api";

export interface CreateKubeApi {
  <Api>(ctor: new (deps: KubeApiDependencies, opts: DerivedKubeApiOptions) => Api, opts?: DerivedKubeApiOptions): Api;
}

const createKubeApiInjectable = getInjectable({
  id: "create-kube-api",
  instantiate: (di): CreateKubeApi => {
    const deps: KubeApiDependencies = {
      logError: di.inject(logErrorInjectionToken),
      logInfo: di.inject(logInfoInjectionToken),
      logWarn: di.inject(logWarningInjectionToken),
      maybeKubeApi: di.inject(maybeKubeApiInjectable),
    };

    return (ctor, opts) => new ctor(deps, opts ?? {});
  },
});

export default createKubeApiInjectable;
