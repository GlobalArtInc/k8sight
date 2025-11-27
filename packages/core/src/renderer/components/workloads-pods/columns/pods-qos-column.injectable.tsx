import { podListLayoutColumnInjectionToken } from "@kubesightapp/list-layout";
import { getInjectable } from "@ogre-tools/injectable";
import { COLUMN_PRIORITY } from "./column-priority";

const columnId = "qos";

export const podsQosColumnInjectable = getInjectable({
  id: "pods-qos-column",
  instantiate: () => ({
    id: columnId,
    kind: "Pod",
    apiVersion: "v1",
    priority: COLUMN_PRIORITY.QOS,
    content: (pod) => pod.getQosClass(),
    header: { title: "QoS", className: "qos", sortBy: columnId, id: columnId },
    sortingCallBack: (pod) => pod.getQosClass(),
  }),
  injectionToken: podListLayoutColumnInjectionToken,
});
