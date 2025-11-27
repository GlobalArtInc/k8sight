import { getInjectable } from "@ogre-tools/injectable";
import logStoreInjectable from "./store.injectable";

import type { Pod } from "@kubesightapp/kube-object";

import type { IComputedValue } from "mobx";

import type { LogTabData } from "./tab-store";

const reloadLogsInjectable = getInjectable({
  id: "reload-logs",

  instantiate: (di) => {
    const logStore = di.inject(logStoreInjectable);

    return (
      tabId: string,
      pod: IComputedValue<Pod | undefined>,
      logTabData: IComputedValue<LogTabData | undefined>,
    ): Promise<void> => logStore.reload(tabId, pod, logTabData);
  },
});

export default reloadLogsInjectable;
