import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { Deployment } from "@kubesightapp/kube-object";

const deploymentScaleDialogStateInjectable = getInjectable({
  id: "deployment-scale-dialog-state",
  instantiate: () => observable.box<Deployment | undefined>(),
});

export default deploymentScaleDialogStateInjectable;
