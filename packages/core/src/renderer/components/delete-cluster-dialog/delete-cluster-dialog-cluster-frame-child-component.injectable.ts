import { clusterFrameChildComponentInjectionToken } from "@kubesightapp/react-application";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { DeleteClusterDialog } from "./view";

const deleteClusterDialogClusterFrameChildComponentInjectable = getInjectable({
  id: "delete-cluster-dialog-cluster-frame-child-component",

  instantiate: () => ({
    id: "delete-cluster-dialog",
    shouldRender: computed(() => true),
    Component: DeleteClusterDialog,
  }),

  injectionToken: clusterFrameChildComponentInjectionToken,
});

export default deleteClusterDialogClusterFrameChildComponentInjectable;
