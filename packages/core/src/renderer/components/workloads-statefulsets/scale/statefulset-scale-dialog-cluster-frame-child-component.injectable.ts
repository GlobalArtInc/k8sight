import { clusterFrameChildComponentInjectionToken } from "@kubesightapp/react-application";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { StatefulSetScaleDialog } from "./dialog";

const statefulsetScaleDialogClusterFrameChildComponentInjectable = getInjectable({
  id: "statefulset-scale-dialog-cluster-frame-child-component",

  instantiate: () => ({
    id: "statefulset-scale-dialog",
    shouldRender: computed(() => true),
    Component: StatefulSetScaleDialog,
  }),

  injectionToken: clusterFrameChildComponentInjectionToken,
});

export default statefulsetScaleDialogClusterFrameChildComponentInjectable;
