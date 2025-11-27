import { podListLayoutColumnInjectionToken } from "@kubesightapp/list-layout";
import { getInjectable } from "@ogre-tools/injectable";
import React from "react";
import { NamespaceSelectBadge } from "../../namespaces/namespace-select-badge";
import { COLUMN_PRIORITY } from "./column-priority";

const columnId = "namespace";

export const podsNamespaceColumnInjectable = getInjectable({
  id: "pods-namespace-column",
  instantiate: () => ({
    id: columnId,
    kind: "Pod",
    apiVersion: "v1",
    priority: COLUMN_PRIORITY.NAMESPACE,
    content: (pod) => <NamespaceSelectBadge key="namespace" namespace={pod.getNs()} />,
    header: { title: "Namespace", className: "namespace", sortBy: columnId, id: columnId },
    sortingCallBack: (pod) => pod.getNs(),
  }),
  injectionToken: podListLayoutColumnInjectionToken,
});
