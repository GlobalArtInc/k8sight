import { getInjectable } from "@ogre-tools/injectable";
import k8SRequestInjectable from "../k8s-request.injectable";

import type { Cluster } from "../../common/cluster/cluster";

const requestClusterVersionInjectable = getInjectable({
  id: "request-cluster-version",
  instantiate: (di) => {
    const k8sRequest = di.inject(k8SRequestInjectable);

    return async (cluster: Cluster) => {
      const { gitVersion } = (await k8sRequest(cluster, "/version")) as { gitVersion: string };

      return gitVersion;
    };
  },
});

export default requestClusterVersionInjectable;
