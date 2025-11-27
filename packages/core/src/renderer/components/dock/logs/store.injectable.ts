import { getInjectable } from "@ogre-tools/injectable";
import callForLogsInjectable from "./call-for-logs.injectable";
import { LogStore } from "./store";

const logStoreInjectable = getInjectable({
  id: "log-store",

  instantiate: (di) =>
    new LogStore({
      callForLogs: di.inject(callForLogsInjectable),
    }),
});

export default logStoreInjectable;
