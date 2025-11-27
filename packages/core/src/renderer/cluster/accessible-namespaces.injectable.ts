import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import hostedClusterInjectable from "../cluster-frame-context/hosted-cluster.injectable";

const clusterConfiguredAccessibleNamespacesInjectable = getInjectable({
  id: "cluster-configured-accessible-namespaces",
  instantiate: (di) => {
    const hostedCluster = di.inject(hostedClusterInjectable);

    return computed(() => [...(hostedCluster?.accessibleNamespaces ?? [])]);
  },
});

export default clusterConfiguredAccessibleNamespacesInjectable;
