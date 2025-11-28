import "./statefulsets.scss";

import { PodStatusPhase } from "@kubesightapp/kube-object";
import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import React from "react";
import eventStoreInjectable from "../events/store.injectable";
import { KubeObjectAge } from "../kube-object/age";
import { KubeObjectListLayout } from "../kube-object-list-layout";
import { KubeObjectStatusIcon } from "../kube-object-status-icon";
import { SiblingsInTabLayout } from "../layout/siblings-in-tab-layout";
import { NamespaceSelectBadge } from "../namespaces/namespace-select-badge";
import { WithTooltip } from "../with-tooltip";
import podStoreInjectable from "../workloads-pods/store.injectable";
import statefulSetStoreInjectable from "./store.injectable";

import type { StatefulSet } from "@kubesightapp/kube-object";

import type { EventStore } from "../events/store";
import type { PodStore } from "../workloads-pods/store";
import type { StatefulSetStore } from "./store";

enum columnId {
  name = "name",
  namespace = "namespace",
  pods = "pods",
  replicas = "replicas",
  age = "age",
  status = "status",
}

interface Dependencies {
  statefulSetStore: StatefulSetStore;
  eventStore: EventStore;
  podStore: PodStore;
}

function getPods(statefulSet: StatefulSet, statefulSetStore: StatefulSetStore) {
  const pods = statefulSetStore.getChildPods(statefulSet);
  const readyPods = pods.filter((pod) => pod.getStatus() === PodStatusPhase.RUNNING).length;
  return `${readyPods}/${pods.length}`;
}

function getStatus(statefulSet: StatefulSet, statefulSetStore: StatefulSetStore): { status: string; className: string } {
  const replicas = statefulSet.getReplicas();
  const pods = statefulSetStore.getChildPods(statefulSet);
  
  if (replicas === 0 || pods.length === 0) {
    return { status: "Scaled to 0", className: "failed" };
  }
  
  const statuses = new Set(pods.map((pod) => pod.getStatus()));
  
  if (statuses.has(PodStatusPhase.FAILED)) {
    return { status: "Failed", className: "failed" };
  }
  if (statuses.has(PodStatusPhase.PENDING)) {
    return { status: "Pending", className: "pending" };
  }
  
  return { status: "Running", className: "running" };
}

const NonInjectedStatefulSets = observer((props: Dependencies) => {
  const { eventStore, statefulSetStore, podStore } = props;

  return (
    <SiblingsInTabLayout>
      <KubeObjectListLayout
        isConfigurable
        tableId="workload_statefulsets"
        className="StatefulSets"
        store={statefulSetStore}
        dependentStores={[eventStore, podStore]} // status icon component uses event store, podStore for reactive pod updates
        sortingCallbacks={{
          [columnId.name]: (statefulSet) => statefulSet.getName(),
          [columnId.namespace]: (statefulSet) => statefulSet.getNs(),
          [columnId.pods]: (statefulSet) => {
            const pods = statefulSetStore.getChildPods(statefulSet);
            const readyPods = pods.filter((pod) => pod.getStatus() === PodStatusPhase.RUNNING).length;
            return readyPods * 1000000 + pods.length;
          },
          [columnId.replicas]: (statefulSet) => statefulSet.getReplicas(),
          [columnId.age]: (statefulSet) => -statefulSet.getCreationTimestamp(),
          [columnId.status]: (statefulSet) => getStatus(statefulSet, statefulSetStore).status,
        }}
        searchFilters={[(statefulSet) => statefulSet.getSearchFields()]}
        renderHeaderTitle="Stateful Sets"
        renderTableHeader={[
          { title: "Name", className: "name", sortBy: columnId.name, id: columnId.name },
          { className: "warning", showWithColumn: columnId.name },
          {
            title: "Namespace",
            className: "namespace",
            sortBy: columnId.namespace,
            id: columnId.namespace,
          },
          { title: "Pods", className: "pods", sortBy: columnId.pods, id: columnId.pods },
          { title: "Replicas", className: "replicas", sortBy: columnId.replicas, id: columnId.replicas },
          { title: "Age", className: "age", sortBy: columnId.age, id: columnId.age },
          { title: "Status", className: "status", sortBy: columnId.status, id: columnId.status },
        ]}
        renderTableContents={(statefulSet) => {
          const statusInfo = getStatus(statefulSet, statefulSetStore);
          return [
            <WithTooltip key="name">{statefulSet.getName()}</WithTooltip>,
            <KubeObjectStatusIcon key="icon" object={statefulSet} />,
            <NamespaceSelectBadge key="namespace" namespace={statefulSet.getNs()} />,
            getPods(statefulSet, statefulSetStore),
            statefulSet.getReplicas(),
            <KubeObjectAge key="age" object={statefulSet} />,
            <span key="status" className={statusInfo.className}>{statusInfo.status}</span>,
          ];
        }}
      />
    </SiblingsInTabLayout>
  );
});

export const StatefulSets = withInjectables<Dependencies>(NonInjectedStatefulSets, {
  getProps: (di, props) => ({
    ...props,
    eventStore: di.inject(eventStoreInjectable),
    statefulSetStore: di.inject(statefulSetStoreInjectable),
    podStore: di.inject(podStoreInjectable),
  }),
});
