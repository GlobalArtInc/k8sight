import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import httpProxy from "http-proxy-node16";
import emitAppEventInjectable from "../../common/app-event-bus/emit-event.injectable";
import k8sightProxyCertificateInjectable from "../../common/certificate/k8sight-proxy-certificate.injectable";
import contentSecurityPolicyInjectable from "../../common/vars/content-security-policy.injectable";
import kubeAuthProxyServerInjectable from "../cluster/kube-auth-proxy-server.injectable";
import routerInjectable from "../router/router.injectable";
import getClusterForRequestInjectable from "./get-cluster-for-request.injectable";
import { K8sightProxy } from "./k8sight-proxy";
import k8sightProxyPortInjectable from "./k8sight-proxy-port.injectable";
import kubeApiUpgradeRequestInjectable from "./proxy-functions/kube-api-upgrade-request.injectable";
import shellApiRequestInjectable from "./proxy-functions/shell-api-request.injectable";

const k8sightProxyInjectable = getInjectable({
  id: "k8sight-proxy",

  instantiate: (di) =>
    new K8sightProxy({
      router: di.inject(routerInjectable),
      proxy: httpProxy.createProxy(),
      kubeApiUpgradeRequest: di.inject(kubeApiUpgradeRequestInjectable),
      shellApiRequest: di.inject(shellApiRequestInjectable),
      getClusterForRequest: di.inject(getClusterForRequestInjectable),
      k8sightProxyPort: di.inject(k8sightProxyPortInjectable),
      contentSecurityPolicy: di.inject(contentSecurityPolicyInjectable),
      emitAppEvent: di.inject(emitAppEventInjectable),
      logger: di.inject(loggerInjectionToken),
      certificate: di.inject(k8sightProxyCertificateInjectable).get(),
      getKubeAuthProxyServer: (cluster) => di.inject(kubeAuthProxyServerInjectable, cluster),
    }),
});

export default k8sightProxyInjectable;
