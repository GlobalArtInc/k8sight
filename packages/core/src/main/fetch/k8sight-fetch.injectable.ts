import { getInjectable } from "@ogre-tools/injectable";
import { Agent } from "https";
import k8sightProxyCertificateInjectable from "../../common/certificate/k8sight-proxy-certificate.injectable";
import nodeFetchInjectable, {
  type NodeFetchRequestInit,
  type NodeFetchResponse,
} from "../../common/fetch/node-fetch.injectable";
import k8sightProxyPortInjectable from "../../main/k8sight-proxy/k8sight-proxy-port.injectable";

export type K8sightRequestInit = Omit<NodeFetchRequestInit, "agent">;

export type K8sightFetch = (pathnameAndQuery: string, init?: K8sightRequestInit) => Promise<NodeFetchResponse>;

const k8sightFetchInjectable = getInjectable({
  id: "k8sight-fetch",
  instantiate: (di): K8sightFetch => {
    const nodeFetch = di.inject(nodeFetchInjectable);
    const k8sightProxyPort = di.inject(k8sightProxyPortInjectable);
    const k8sightProxyCertificate = di.inject(k8sightProxyCertificateInjectable);

    return async (pathnameAndQuery, init = {}) => {
      const agent = new Agent({
        ca: k8sightProxyCertificate.get().cert,
      });

      return nodeFetch(`https://127.0.0.1:${k8sightProxyPort.get()}${pathnameAndQuery}`, {
        ...init,
        agent,
      });
    };
  },
  causesSideEffects: true,
});

export default k8sightFetchInjectable;
