import { getInjectable } from "@ogre-tools/injectable";
import deploymentScaleDialogStateInjectable from "./dialog-state.injectable";

import type { Deployment } from "@kubesightapp/kube-object";

export type OpenDeploymentScaleDialog = (obj: Deployment) => void;

const openDeploymentScaleDialogInjectable = getInjectable({
  id: "open-deployment-scale-dialog",
  instantiate: (di): OpenDeploymentScaleDialog => {
    const state = di.inject(deploymentScaleDialogStateInjectable);

    return (obj) => state.set(obj);
  },
});

export default openDeploymentScaleDialogInjectable;
