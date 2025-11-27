import { getInjectable } from "@ogre-tools/injectable";
import { preferenceItemInjectionToken } from "../../preference-item-injection-token";
import { KubeconfigSync } from "./kubeconfig-sync";

const kubeconfigSyncPreferenceBlockInjectable = getInjectable({
  id: "kubeconfig-sync-preference-item",

  instantiate: () => ({
    kind: "block" as const,
    id: "kubeconfig-sync",
    parentId: "kubernetes-page",
    orderNumber: 30,
    Component: KubeconfigSync,
  }),

  injectionToken: preferenceItemInjectionToken,
});

export default kubeconfigSyncPreferenceBlockInjectable;
