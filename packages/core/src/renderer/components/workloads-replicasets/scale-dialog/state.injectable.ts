import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { ReplicaSet } from "@kubesightapp/kube-object";

const replicaSetScaleDialogStateInjectable = getInjectable({
  id: "replica-set-scale-dialog-state",
  instantiate: () => observable.box<ReplicaSet | undefined>(),
});

export default replicaSetScaleDialogStateInjectable;
