import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import execHelmInjectable from "../../exec-helm/exec-helm.injectable";

import type { AsyncResult } from "@kubesightapp/utilities";

import type { HelmRepo } from "../../../../common/helm/helm-repo";

const removeHelmRepositoryInjectable = getInjectable({
  id: "remove-helm-repository",

  instantiate: (di) => {
    const execHelm = di.inject(execHelmInjectable);
    const logger = di.inject(loggerInjectionToken);

    return async (repo: HelmRepo): AsyncResult<void, string> => {
      logger.info(`[HELM]: removing repo ${repo.name} (${repo.url})`);

      const result = await execHelm(["repo", "remove", repo.name]);

      if (result.callWasSuccessful) {
        return {
          callWasSuccessful: true,
        };
      }

      return {
        callWasSuccessful: false,
        error: result.error.stderr,
      };
    };
  },
});

export default removeHelmRepositoryInjectable;
