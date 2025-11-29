import { getInjectable } from "@ogre-tools/injectable";
import { apiBaseServerAddressInjectionToken } from "../../common/k8s-api/api-base-configs";
import k8sightProxyPortInjectable from "../k8sight-proxy/k8sight-proxy-port.injectable";

const apiBaseServerAddressInjectable = getInjectable({
  id: "api-base-server-address",
  instantiate: (di) => {
    const k8sightProxyPort = di.inject(k8sightProxyPortInjectable);

    return `https://127.0.0.1:${k8sightProxyPort.get()}`;
  },
  injectionToken: apiBaseServerAddressInjectionToken,
});

export default apiBaseServerAddressInjectable;
