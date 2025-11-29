import { getInjectable, lifecycleEnum } from "@ogre-tools/injectable";
import k8sightProxyPortInjectable from "../k8sight-proxy/k8sight-proxy-port.injectable";

import type { Cluster } from "../../common/cluster/cluster";

const kubeAuthProxyUrlInjectable = getInjectable({
  id: "kube-auth-proxy-url",
  instantiate: (di, cluster) => {
    const k8sightProxyPort = di.inject(k8sightProxyPortInjectable);

    return `https://127.0.0.1:${k8sightProxyPort.get()}/${cluster.id}`;
  },
  lifecycle: lifecycleEnum.keyedSingleton({
    getInstanceKey: (di, cluster: Cluster) => cluster.id,
  }),
});

export default kubeAuthProxyUrlInjectable;
