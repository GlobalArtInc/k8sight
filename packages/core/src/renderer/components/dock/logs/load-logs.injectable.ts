import { getInjectable } from "@ogre-tools/injectable";
import logStoreInjectable from "./store.injectable";

import type { Pod } from "@kubesightapp/kube-object";

import type { IComputedValue } from "mobx";

import type { LogTabData } from "./tab-store";

export interface LoadLogs {
  (
    tabId: string,
    pod: IComputedValue<Pod | undefined>,
    logTabData: IComputedValue<LogTabData | undefined>,
  ): Promise<void>;
}

const loadLogsInjectable = getInjectable({
  id: "load-logs",

  instantiate: (di): LoadLogs => {
    const logStore = di.inject(logStoreInjectable);

    return (tabId, pod, logTabData) => logStore.load(tabId, pod, logTabData);
  },
});

export default loadLogsInjectable;
