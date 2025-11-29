import "./deployments.scss";

import { Icon } from "@kubesightapp/icon";
import { PodStatusPhase } from "@kubesightapp/kube-object";
import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import React from "react";
import createWorkloadLogsTabInjectable from "../dock/logs/create-workload-logs-tab.injectable";
import eventStoreInjectable from "../events/store.injectable";
import { KubeObjectAge } from "../kube-object/age";
import { KubeObjectListLayout } from "../kube-object-list-layout";
import { KubeObjectStatusIcon } from "../kube-object-status-icon";
import { SiblingsInTabLayout } from "../layout/siblings-in-tab-layout";
import { NamespaceSelectBadge } from "../namespaces/namespace-select-badge";
import { WithTooltip } from "../with-tooltip";
import podStoreInjectable from "../workloads-pods/store.injectable";
import deploymentStoreInjectable from "./store.injectable";

import type { Deployment } from "@kubesightapp/kube-object";

import type { EventStore } from "../events/store";
import type { PodStore } from "../workloads-pods/store";
import type { DeploymentStore } from "./store";

enum columnId {
  name = "name",
  namespace = "namespace",
  pods = "pods",
  replicas = "replicas",
  age = "age",
  status = "status",
  logs = "logs",
}

interface Dependencies {
  deploymentStore: DeploymentStore;
  eventStore: EventStore;
  podStore: PodStore;
  createWorkloadLogsTab: (data: { workload: Deployment }) => string;
}

function getPods(deployment: Deployment, deploymentStore: DeploymentStore) {
  const pods = deploymentStore.getChildPods(deployment);
  const readyPods = pods.filter((pod) => pod.getStatus() === PodStatusPhase.RUNNING).length;
  return `${readyPods}/${pods.length}`;
}

function getStatus(deployment: Deployment, deploymentStore: DeploymentStore): { status: string; className: string } {
  const replicas = deployment.getReplicas();
  const pods = deploymentStore.getChildPods(deployment);

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

@observer
class NonInjectedDeployments extends React.Component<Dependencies> {
  render() {
    const { deploymentStore, eventStore, podStore, createWorkloadLogsTab } = this.props;

    return (
      <SiblingsInTabLayout>
        <KubeObjectListLayout
          isConfigurable
          tableId="workload_deployments"
          className="Deployments"
          store={deploymentStore}
          dependentStores={[eventStore, podStore]} // status icon component uses event store, podStore for reactive pod updates
          sortingCallbacks={{
            [columnId.name]: (deployment) => deployment.getName(),
            [columnId.namespace]: (deployment) => deployment.getNs(),
            [columnId.pods]: (deployment) => {
              const pods = deploymentStore.getChildPods(deployment);
              const readyPods = pods.filter((pod) => pod.getStatus() === PodStatusPhase.RUNNING).length;
              return readyPods * 1000000 + pods.length;
            },
            [columnId.replicas]: (deployment) => deployment.getReplicas(),
            [columnId.age]: (deployment) => -deployment.getCreationTimestamp(),
            [columnId.status]: (deployment) => getStatus(deployment, deploymentStore).status,
          }}
          searchFilters={[(deployment) => deployment.getSearchFields(), (deployment) => deployment.getConditionsText()]}
          renderHeaderTitle="Deployments"
          renderTableHeader={[
            { title: "Name", className: "name", sortBy: columnId.name, id: columnId.name },
            { className: "warning", showWithColumn: columnId.name },
            { className: "logs", showWithColumn: columnId.name },
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
          renderTableContents={(deployment) => {
            const statusInfo = getStatus(deployment, deploymentStore);
            return [
              <WithTooltip key="name">{deployment.getName()}</WithTooltip>,
              <KubeObjectStatusIcon key="icon" object={deployment} />,
              <Icon
                key="logs"
                material="subject"
                tooltip="View Logs"
                interactive
                onClick={(event) => {
                  event.stopPropagation();
                  try {
                    createWorkloadLogsTab({ workload: deployment });
                  } catch (err) {
                    console.error("Failed to open logs", err);
                  }
                }}
                style={{ cursor: "pointer" }}
              />,
              <NamespaceSelectBadge key="namespace" namespace={deployment.getNs()} />,
              getPods(deployment, deploymentStore),
              deployment.getReplicas(),
              <KubeObjectAge key="age" object={deployment} />,
              <span key="status" className={statusInfo.className}>
                {statusInfo.status}
              </span>,
            ];
          }}
        />
      </SiblingsInTabLayout>
    );
  }
}

export const Deployments = withInjectables<Dependencies>(NonInjectedDeployments, {
  getProps: (di, props) => ({
    ...props,
    deploymentStore: di.inject(deploymentStoreInjectable),
    eventStore: di.inject(eventStoreInjectable),
    podStore: di.inject(podStoreInjectable),
    createWorkloadLogsTab: di.inject(createWorkloadLogsTabInjectable),
  }),
});
