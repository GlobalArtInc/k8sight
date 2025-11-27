import { podApiInjectable } from "@kubesightapp/kube-api-specifics";
import { getInjectable } from "@ogre-tools/injectable";

import type { ResourceDescriptor } from "@kubesightapp/kube-api";
import type { PodLogsQuery } from "@kubesightapp/kube-object";

export type CallForLogs = (params: ResourceDescriptor, query?: PodLogsQuery) => Promise<string>;

const callForLogsInjectable = getInjectable({
  id: "call-for-logs",
  instantiate: (di): CallForLogs => {
    const api = di.inject(podApiInjectable);

    return (params, query) => api.getLogs(params, query);
  },
});

export default callForLogsInjectable;
