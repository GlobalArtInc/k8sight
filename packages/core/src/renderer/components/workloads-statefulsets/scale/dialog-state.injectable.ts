import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { StatefulSet } from "@kubesightapp/kube-object";

const statefulSetDialogStateInjectable = getInjectable({
  id: "stateful-set-dialog-state",
  instantiate: () => observable.box<StatefulSet | undefined>(),
});

export default statefulSetDialogStateInjectable;
