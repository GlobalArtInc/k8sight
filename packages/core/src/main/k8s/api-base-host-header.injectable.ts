import { getInjectable } from "@ogre-tools/injectable";
import { apiBaseHostHeaderInjectionToken } from "../../common/k8s-api/api-base-configs";
import k8sightProxyPortInjectable from "../k8sight-proxy/k8sight-proxy-port.injectable";

const apiBaseHostHeaderInjectable = getInjectable({
  id: "api-base-host-header",
  instantiate: (di) => {
    const k8sightProxyPort = di.inject(k8sightProxyPortInjectable);

    return `renderer.k8sight.app:${k8sightProxyPort.get()}`;
  },
  injectionToken: apiBaseHostHeaderInjectionToken,
});

export default apiBaseHostHeaderInjectable;
