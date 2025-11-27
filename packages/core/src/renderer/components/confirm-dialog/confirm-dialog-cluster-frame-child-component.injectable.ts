import { clusterFrameChildComponentInjectionToken } from "@kubesightapp/react-application";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { ConfirmDialog } from "./confirm-dialog";

const confirmDialogClusterFrameChildComponentInjectable = getInjectable({
  id: "confirm-dialog-cluster-frame-child-component",

  instantiate: () => ({
    id: "confirm-dialog",
    shouldRender: computed(() => true),
    Component: ConfirmDialog,
  }),

  injectionToken: clusterFrameChildComponentInjectionToken,
});

export default confirmDialogClusterFrameChildComponentInjectable;
