import "./jobs.scss";

import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import React from "react";
import eventStoreInjectable from "../events/store.injectable";
import { KubeObjectAge } from "../kube-object/age";
import { KubeObjectConditionsList } from "../kube-object-conditions";
import { KubeObjectListLayout } from "../kube-object-list-layout";
import { KubeObjectStatusIcon } from "../kube-object-status-icon";
import { SiblingsInTabLayout } from "../layout/siblings-in-tab-layout";
import { NamespaceSelectBadge } from "../namespaces/namespace-select-badge";
import { WithTooltip } from "../with-tooltip";
import jobStoreInjectable from "./store.injectable";

import type { Job } from "@kubesightapp/kube-object";

import type { EventStore } from "../events/store";
import type { JobStore } from "./store";

enum columnId {
  name = "name",
  namespace = "namespace",
  completions = "completions",
  age = "age",
  conditions = "conditions",
}

function getCompletions(job: Job) {
  const succeeded = job.getCompletions();
  const desired = job.getDesiredCompletions();
  return `${succeeded}/${desired}`;
}

export function getStatusText(obj: Job) {
  const conditions = obj.getConditions();
  if (!conditions || !conditions.length) {
    return "Unknown";
  }
  if (obj.hasCondition("Complete")) {
    return "Complete";
  } else if (obj.hasCondition("Failed")) {
    return "Failed";
  } else if (obj.metadata.deletionTimestamp) {
    if (obj.metadata.finalizers?.length) {
      return "Finalizing";
    }
    return "Terminating";
  } else if (obj.hasCondition("Suspended")) {
    return "Suspended";
  } else if (obj.hasCondition("FailureTarget")) {
    return "FailureTarget";
  }
  return "Running";
}

export function getStatusClass(obj: Job) {
  const status = getStatusText(obj);
  switch (status) {
    case "Complete":
      return "success";
    case "Failed":
    case "FailureTarget":
      return "error";
    case "Running":
      return "info";
    case "Suspended":
      return "warning";
    default:
      return "";
  }
}

interface Dependencies {
  jobStore: JobStore;
  eventStore: EventStore;
}

const NonInjectedJobs = observer((props: Dependencies) => {
  const { eventStore, jobStore } = props;

  return (
    <SiblingsInTabLayout>
      <KubeObjectListLayout
        isConfigurable
        tableId="workload_jobs"
        className="Jobs"
        store={jobStore}
        dependentStores={[eventStore]} // status icon component uses event store
        sortingCallbacks={{
          [columnId.name]: (job) => job.getName(),
          [columnId.namespace]: (job) => job.getNs(),
          [columnId.completions]: (job) => {
            const succeeded = job.getCompletions();
            const desired = job.getDesiredCompletions();
            return succeeded * 1000000 + desired;
          },
          [columnId.age]: (job) => -job.getCreationTimestamp(),
          [columnId.conditions]: (job) => {
            const condition = job.getCondition();
            return condition?.type || "";
          },
        }}
        searchFilters={[(job) => job.getSearchFields()]}
        renderHeaderTitle="Jobs"
        renderTableHeader={[
          { title: "Name", className: "name", sortBy: columnId.name, id: columnId.name },
          { className: "warning", showWithColumn: columnId.name },
          {
            title: "Namespace",
            className: "namespace",
            sortBy: columnId.namespace,
            id: columnId.namespace,
          },
          { title: "Completions", className: "completions", sortBy: columnId.completions, id: columnId.completions },
          { title: "Age", className: "age", sortBy: columnId.age, id: columnId.age },
          {
            title: "Conditions",
            className: "conditions scrollable",
            sortBy: columnId.conditions,
            id: columnId.conditions,
          },
        ]}
        renderTableContents={(job) => {
          return [
            <WithTooltip key="name">{job.getName()}</WithTooltip>,
            <KubeObjectStatusIcon key="icon" object={job} />,
            <NamespaceSelectBadge key="namespace" namespace={job.getNs()} />,
            getCompletions(job),
            <KubeObjectAge key="age" object={job} />,
            <KubeObjectConditionsList key="conditions" object={job} />,
          ];
        }}
      />
    </SiblingsInTabLayout>
  );
});

export const Jobs = withInjectables<Dependencies>(NonInjectedJobs, {
  getProps: (di, props) => ({
    ...props,
    eventStore: di.inject(eventStoreInjectable),
    jobStore: di.inject(jobStoreInjectable),
  }),
});
