import { Deployment } from "@kubesightapp/kube-object";
import { getInjectable } from "@ogre-tools/injectable";
import getPodsByOwnerIdInjectable from "../../workloads-pods/get-pods-by-owner-id.injectable";
import podStoreInjectable from "../../workloads-pods/store.injectable";
import createLogsTabInjectable from "./create-logs-tab.injectable";

import type { StatefulSet } from "@kubesightapp/kube-object";

import type { PodStore } from "../../workloads-pods/store";
import type { TabId } from "../dock/store";

export interface WorkloadLogsTabData {
  workload: Deployment | StatefulSet;
}

const createWorkloadLogsTabInjectable = getInjectable({
  id: "create-workload-logs-tab",

  instantiate: (di) => {
    const createLogsTab = di.inject(createLogsTabInjectable);
    const getPodsByOwnerId = di.inject(getPodsByOwnerIdInjectable);
    const podStore = di.inject(podStoreInjectable);

    return ({ workload }: WorkloadLogsTabData): TabId => {
      let pods: ReturnType<PodStore["getByLabel"]>;

      if (workload instanceof Deployment) {
        pods = podStore.getByLabel(workload.getTemplateLabels()).filter((pod) => pod.getNs() === workload.getNs());
      } else {
        pods = getPodsByOwnerId(workload.getId());
      }

      if (pods.length === 0) {
        throw new Error(`No pods found for ${workload.kind} ${workload.getName()}`);
      }

      const firstPod = pods[0];
      const firstContainer = firstPod.getAllContainers()[0];

      if (!firstContainer) {
        throw new Error(`No containers found in pod ${firstPod.getName()}`);
      }

      return createLogsTab(`${workload.kind} ${workload.getName()}`, {
        owner: {
          uid: workload.getId(),
          name: workload.getName(),
          kind: workload.kind,
        },
        namespace: workload.getNs(),
        selectedContainer: firstContainer.name,
        selectedPodId: firstPod.getId(),
      });
    };
  },
});

export default createWorkloadLogsTabInjectable;
