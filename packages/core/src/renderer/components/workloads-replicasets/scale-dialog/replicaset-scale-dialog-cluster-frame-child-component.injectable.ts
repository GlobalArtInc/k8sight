import { clusterFrameChildComponentInjectionToken } from "@kubesightapp/react-application";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { ReplicaSetScaleDialog } from "./dialog";

const replicasetScaleDialogClusterFrameChildComponentInjectable = getInjectable({
  id: "replicaset-scale-dialog-cluster-frame-child-component",

  instantiate: () => ({
    id: "replicaset-scale-dialog",
    shouldRender: computed(() => true),
    Component: ReplicaSetScaleDialog,
  }),

  injectionToken: clusterFrameChildComponentInjectionToken,
});

export default replicasetScaleDialogClusterFrameChildComponentInjectable;
