import { CronJobApi } from "@kubesightapp/kube-api";
import { logErrorInjectionToken, logInfoInjectionToken, logWarningInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import assert from "assert";
import { storesAndApisCanBeCreatedInjectionToken } from "./can-be-created-token";
import { maybeKubeApiInjectable } from "./maybe-kube-api.injectable";
import { kubeApiInjectionToken } from "./token";

export const cronJobApiInjectable = getInjectable({
  id: "cron-job-api",
  instantiate: (di) => {
    assert(di.inject(storesAndApisCanBeCreatedInjectionToken), "cronJobApi is only available in certain environments");

    return new CronJobApi(
      {
        logError: di.inject(logErrorInjectionToken),
        logInfo: di.inject(logInfoInjectionToken),
        logWarn: di.inject(logWarningInjectionToken),
        maybeKubeApi: di.inject(maybeKubeApiInjectable),
      },
      {
        checkPreferredVersion: true,
      },
    );
  },

  injectionToken: kubeApiInjectionToken,
});
