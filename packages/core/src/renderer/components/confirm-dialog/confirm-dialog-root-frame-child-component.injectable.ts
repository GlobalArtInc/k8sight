import { rootFrameChildComponentInjectionToken } from "@kubesightapp/react-application";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { ConfirmDialog } from "./confirm-dialog";

const confirmDialogRootFrameChildComponentInjectable = getInjectable({
  id: "confirm-dialog-root-frame-child-component",

  instantiate: () => ({
    id: "confirm-dialog",
    shouldRender: computed(() => true),
    Component: ConfirmDialog,
  }),

  injectionToken: rootFrameChildComponentInjectionToken,
});

export default confirmDialogRootFrameChildComponentInjectable;
