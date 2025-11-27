import { getInjectable } from "@ogre-tools/injectable";
import getPodsByOwnerIdInjectable from "../../workloads-pods/get-pods-by-owner-id.injectable";
import podStoreInjectable from "../../workloads-pods/store.injectable";
import createLogsTabInjectable from "./create-logs-tab.injectable";

import type { DaemonSet, Deployment, Job, ReplicaSet, StatefulSet } from "@kubesightapp/kube-object";

import type { GetPodsByOwnerId } from "../../workloads-pods/get-pods-by-owner-id.injectable";
import type { PodStore } from "../../workloads-pods/store";
import type { TabId } from "../dock/store";
import type { CreateLogsTabData } from "./create-logs-tab.injectable";

export interface WorkloadLogsTabData {
  workload: StatefulSet | Job | Deployment | DaemonSet | ReplicaSet;
}

interface Dependencies {
  createLogsTab: (title: string, data: CreateLogsTabData) => TabId;
  getPodsByOwnerId: GetPodsByOwnerId;
  podStore: PodStore;
}

const createWorkloadLogsTab =
  ({ createLogsTab, getPodsByOwnerId, podStore }: Dependencies) =>
  ({ workload }: WorkloadLogsTabData): TabId | undefined => {
    let pods;

    if (workload.kind === "Deployment") {
      const deployment = workload as Deployment;
      pods = podStore
        .getByLabel(deployment.getTemplateLabels())
        .filter((pod) => pod.getNs() === deployment.getNs());
    } else {
      pods = getPodsByOwnerId(workload.getId());
    }

    if (pods.length === 0) {
      return undefined;
    }

    const selectedPod = pods[0];

    return createLogsTab(`${workload.kind} ${selectedPod.getName()}`, {
      selectedContainer: selectedPod.getAllContainers()[0].name,
      selectedPodId: selectedPod.getId(),
      namespace: selectedPod.getNs(),
      owner: {
        kind: workload.kind,
        name: workload.getName(),
        uid: workload.getId(),
      },
    });
  };

const createWorkloadLogsTabInjectable = getInjectable({
  id: "create-workload-logs-tab",

  instantiate: (di) =>
    createWorkloadLogsTab({
      createLogsTab: di.inject(createLogsTabInjectable),
      getPodsByOwnerId: di.inject(getPodsByOwnerIdInjectable),
      podStore: di.inject(podStoreInjectable),
    }),
});

export default createWorkloadLogsTabInjectable;
