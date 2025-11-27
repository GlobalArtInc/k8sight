import { getInjectable } from "@ogre-tools/injectable";
import deploymentStoreInjectable from "../workloads-deployments/store.injectable";
import podStoreInjectable from "./store.injectable";
import getPodsByOwnerIdInjectable from "./get-pods-by-owner-id.injectable";

import type { Pod } from "@kubesightapp/kube-object";

import type { DeploymentStore } from "../workloads-deployments/store";
import { LogTabOwnerRef } from "../dock/logs/tab-store";

export type GetPodsByOwner = (owner: LogTabOwnerRef, namespace: string) => Pod[];

const getPodsByOwnerInjectable = getInjectable({
  id: "get-pods-by-owner",

  instantiate: (di): GetPodsByOwner => {
    const podStore = di.inject(podStoreInjectable);
    const deploymentStore = di.inject(deploymentStoreInjectable);
    const getPodsByOwnerId = di.inject(getPodsByOwnerIdInjectable);

    return (owner: LogTabOwnerRef, namespace: string): Pod[] => {
      if (owner.kind === "Deployment") {
        const deployment = (deploymentStore as DeploymentStore).items.find(
          (d) => d.getId() === owner.uid && d.getNs() === namespace,
        );

        if (deployment) {
          return podStore
            .getByLabel(deployment.getTemplateLabels())
            .filter((pod) => pod.getNs() === namespace);
        }

        return [];
      }

      return getPodsByOwnerId(owner.uid).filter((pod) => pod.getNs() === namespace);
    };
  },
});

export default getPodsByOwnerInjectable;

