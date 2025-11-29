import { getInjectable } from "@ogre-tools/injectable";
import { withTimeout } from "../common/fetch/timeout-controller";
import k8sightFetchInjectable, { type K8sightRequestInit } from "./fetch/k8sight-fetch.injectable";

export interface K8sRequestInit extends K8sightRequestInit {
  timeout?: number;
}

export interface ClusterData {
  readonly id: string;
}

export type K8sRequest = (cluster: ClusterData, pathnameAndQuery: string, init?: K8sRequestInit) => Promise<unknown>;

const k8sRequestInjectable = getInjectable({
  id: "k8s-request",

  instantiate: (di): K8sRequest => {
    const k8sightFetch = di.inject(k8sightFetchInjectable);

    return async (cluster, pathnameAndQuery, { timeout = 30_000, signal, ...init } = {}) => {
      const controller = timeout ? withTimeout(timeout) : undefined;

      if (controller && signal) {
        signal.addEventListener("abort", () => controller.abort());
      }

      const response = await k8sightFetch(`/${cluster.id}${pathnameAndQuery}`, {
        ...init,
        signal: controller?.signal ?? (signal as any),
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(
          `Failed to ${init.method ?? "get"} ${pathnameAndQuery} for clusterId=${cluster.id}: ${response.statusText}`,
          { cause: response },
        );
      }

      return response.json();
    };
  },
});

export default k8sRequestInjectable;
