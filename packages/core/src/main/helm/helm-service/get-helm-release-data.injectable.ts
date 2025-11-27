import { isObject, json } from "@kubesightapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";
import execHelmInjectable from "../exec-helm/exec-helm.injectable";

import type { AsyncResult } from "@kubesightapp/utilities";

import type { HelmReleaseData } from "../../../features/helm-releases/common/channels";

export type GetHelmReleaseData = (
  name: string,
  namespace: string,
  kubeconfigPath: string,
) => AsyncResult<HelmReleaseData, string>;

const getHelmReleaseDataInjectable = getInjectable({
  id: "get-helm-release-data",
  instantiate: (di): GetHelmReleaseData => {
    const execHelm = di.inject(execHelmInjectable);

    return async (releaseName, namespace, proxyKubeconfigPath) => {
      const result = await execHelm([
        "status",
        releaseName,
        "--namespace",
        namespace,
        "--kubeconfig",
        proxyKubeconfigPath,
        "--output",
        "json",
      ]);

      if (!result.callWasSuccessful) {
        return {
          callWasSuccessful: false,
          error: `Failed to execute helm: ${result.error}`,
        };
      }

      const parseResult = json.parse(result.response);

      if (!parseResult.callWasSuccessful) {
        return {
          callWasSuccessful: false,
          error: `Failed to parse helm response: ${parseResult.error}`,
        };
      }

      const release = parseResult.response;

      if (!isObject(release) || Array.isArray(release)) {
        return {
          callWasSuccessful: false,
          error: `Helm response is not an object: ${JSON.stringify(release)}`,
        };
      }

      return {
        callWasSuccessful: true,
        response: release as unknown as HelmReleaseData,
      };
    };
  },
});

export default getHelmReleaseDataInjectable;
