import { clusterFrameChildComponentInjectionToken } from "@kubesightapp/react-application";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { KubeObjectDetails } from "./kube-object-details";

const kubeObjectDetailsClusterFrameChildComponentInjectable = getInjectable({
  id: "kube-object-details-cluster-frame-child-component",

  instantiate: () => ({
    id: "kube-object-details",
    shouldRender: computed(() => true),
    Component: KubeObjectDetails,
  }),

  injectionToken: clusterFrameChildComponentInjectionToken,
});

export default kubeObjectDetailsClusterFrameChildComponentInjectable;
