import { getInjectable, lifecycleEnum } from "@ogre-tools/injectable";
import { asyncComputed } from "@ogre-tools/injectable-react";
import { now } from "mobx-utils";
import requestPodMetricsForDeploymentsInjectable from "../../../common/k8s-api/endpoints/metrics.api/request-pod-metrics-for-deployments.injectable";

import type { Deployment } from "@kubesightapp/kube-object";

const deploymentMetricsInjectable = getInjectable({
  id: "deployment-metrics",
  instantiate: (di, deployment) => {
    const requestPodMetricsForDeployments = di.inject(requestPodMetricsForDeploymentsInjectable);

    return asyncComputed({
      getValueFromObservedPromise: () => {
        now(60 * 1000);

        return requestPodMetricsForDeployments([deployment], deployment.getNs());
      },
    });
  },
  lifecycle: lifecycleEnum.keyedSingleton({
    getInstanceKey: (di, deployment: Deployment) => deployment.getId(),
  }),
});

export default deploymentMetricsInjectable;
