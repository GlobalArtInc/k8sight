import { observableHistoryInjectionToken } from "@kubesightapp/routing";
import { getInjectable } from "@ogre-tools/injectable";
import { reaction } from "mobx";
import { emitWindowLocationChanged } from "../ipc";

const watchHistoryStateInjectable = getInjectable({
  id: "watch-history-state",

  instantiate: (di) => {
    const observableHistory = di.inject(observableHistoryInjectionToken);

    return () => reaction(() => observableHistory.location, emitWindowLocationChanged);
  },

  causesSideEffects: true,
});

export default watchHistoryStateInjectable;
