import { getInjectable } from "@ogre-tools/injectable";
import bundledBinaryPathInjectable from "../../common/utils/bundled-binary-path.injectable";

const k8SightK8sProxyPathInjectable = getInjectable({
  id: "k8sight-k8s-proxy-path",
  instantiate: (di) => {
    const path = di.inject(bundledBinaryPathInjectable, "k8sight-k8s-proxy");
    return path;
  },
});

export default k8SightK8sProxyPathInjectable;
