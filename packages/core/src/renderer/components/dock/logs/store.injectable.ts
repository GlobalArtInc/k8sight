import { getInjectable } from "@ogre-tools/injectable";
import deploymentStoreInjectable from "../../workloads-deployments/store.injectable";
import getPodsByOwnerIdInjectable from "../../workloads-pods/get-pods-by-owner-id.injectable";
import podStoreInjectable from "../../workloads-pods/store.injectable";
import callForLogsInjectable from "./call-for-logs.injectable";
import { LogStore } from "./store";

const logStoreInjectable = getInjectable({
  id: "log-store",

  instantiate: (di) =>
    new LogStore({
      callForLogs: di.inject(callForLogsInjectable),
      getPodsByOwnerId: di.inject(getPodsByOwnerIdInjectable),
      podStore: di.inject(podStoreInjectable),
      deploymentStore: di.inject(deploymentStoreInjectable),
    }),
});

export default logStoreInjectable;
