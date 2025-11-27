import { getInjectable } from "@ogre-tools/injectable";
import statefulSetDialogStateInjectable from "./dialog-state.injectable";

import type { StatefulSet } from "@kubesightapp/kube-object";

export type OpenStatefulSetScaleDialog = (obj: StatefulSet) => void;

const openStatefulSetScaleDialogInjectable = getInjectable({
  id: "open-stateful-set-scale-dialog",
  instantiate: (di): OpenStatefulSetScaleDialog => {
    const state = di.inject(statefulSetDialogStateInjectable);

    return (obj) => state.set(obj);
  },
});

export default openStatefulSetScaleDialogInjectable;
