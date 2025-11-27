import { getInjectable } from "@ogre-tools/injectable";
import { PortForwardDialogModel } from "./port-forward-dialog-model";

const portForwardDialogModelInjectable = getInjectable({
  id: "port-forward-dialog-model",
  instantiate: () => new PortForwardDialogModel(),
});

export default portForwardDialogModelInjectable;
