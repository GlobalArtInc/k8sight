import { Icon } from "@kubesightapp/icon";
import { podListLayoutColumnInjectionToken } from "@kubesightapp/list-layout";
import { getInjectable } from "@ogre-tools/injectable";
import { withInjectables } from "@ogre-tools/injectable-react";
import React from "react";
import createPodLogsTabInjectable from "../../dock/logs/create-pod-logs-tab.injectable";
import { COLUMN_PRIORITY } from "./column-priority";

import type { Pod } from "@kubesightapp/kube-object";

const columnId = "logs";

interface Dependencies {
  createPodLogsTab: ReturnType<typeof createPodLogsTabInjectable.instantiate>;
}

interface LogsButtonProps {
  pod: Pod;
}

const NonInjectableLogsButton: React.FC<LogsButtonProps & Dependencies> = ({ pod, createPodLogsTab }) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    const containers = pod.getAllContainers();

    if (containers.length === 0) {
      return;
    }

    // Use the first container by default
    // For multi-container pods, users can still use the context menu for specific container selection
    const selectedContainer = containers[0];

    createPodLogsTab({
      selectedPod: pod,
      selectedContainer,
    });
  };

  return (
    <Icon material="subject" tooltip="View Logs" interactive onClick={handleClick} style={{ cursor: "pointer" }} />
  );
};

const LogsButton = withInjectables<Dependencies, LogsButtonProps>(NonInjectableLogsButton, {
  getProps: (di, props) => ({
    ...props,
    createPodLogsTab: di.inject(createPodLogsTabInjectable),
  }),
});

export const podsLogsButtonColumnInjectable = getInjectable({
  id: "pods-logs-button-column",
  instantiate: () => ({
    id: columnId,
    kind: "Pod",
    apiVersion: "v1",
    priority: COLUMN_PRIORITY.LOGS,
    content: (pod: Pod) => <LogsButton pod={pod} />,
    header: { title: <Icon material="subject" />, className: "logs", id: columnId },
  }),
  injectionToken: podListLayoutColumnInjectionToken,
});
