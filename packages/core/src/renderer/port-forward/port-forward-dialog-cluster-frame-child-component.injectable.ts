import { clusterFrameChildComponentInjectionToken } from "@kubesightapp/react-application";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { PortForwardDialog } from "./port-forward-dialog";

const portForwardDialogClusterFrameChildComponentInjectable = getInjectable({
  id: "port-forward-dialog-cluster-frame-child-component",

  instantiate: () => ({
    id: "port-forward-dialog",
    shouldRender: computed(() => true),
    Component: PortForwardDialog,
  }),

  injectionToken: clusterFrameChildComponentInjectionToken,
});

export default portForwardDialogClusterFrameChildComponentInjectable;
