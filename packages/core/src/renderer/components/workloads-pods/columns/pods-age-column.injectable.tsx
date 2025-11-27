import { podListLayoutColumnInjectionToken } from "@kubesightapp/list-layout";
import { getInjectable } from "@ogre-tools/injectable";
import React from "react";
import { KubeObjectAge } from "../../kube-object/age";
import { COLUMN_PRIORITY } from "./column-priority";

const columnId = "age";

export const podsAgeColumnInjectable = getInjectable({
  id: "pods-age-column",
  instantiate: () => ({
    id: columnId,
    kind: "Pod",
    apiVersion: "v1",
    priority: COLUMN_PRIORITY.AGE,
    content: (pod) => <KubeObjectAge key="age" object={pod} />,
    header: { title: "Age", className: "age", sortBy: columnId, id: columnId },
    sortingCallBack: (pod) => -pod.getCreationTimestamp(),
  }),
  injectionToken: podListLayoutColumnInjectionToken,
});
