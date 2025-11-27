import { clusterFrameChildComponentInjectionToken } from "@kubesightapp/react-application";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { KubeConfigDialog } from "./kubeconfig-dialog";

const kubeconfigDialogClusterFrameChildComponentInjectable = getInjectable({
  id: "kubeconfig-dialog-cluster-frame-child-component",

  instantiate: () => ({
    id: "kubeconfig-dialog",
    shouldRender: computed(() => true),
    Component: KubeConfigDialog,
  }),

  injectionToken: clusterFrameChildComponentInjectionToken,
});

export default kubeconfigDialogClusterFrameChildComponentInjectable;
