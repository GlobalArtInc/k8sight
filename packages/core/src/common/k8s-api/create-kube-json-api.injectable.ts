import { KubeJsonApi } from "@kubesightapp/kube-api";
import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import { Agent } from "https";
import packageJson from "../../../package.json";
import lensProxyCertificateInjectable from "../certificate/lens-proxy-certificate.injectable";
import nodeFetchInjectable, { type NodeFetchRequestInit } from "../fetch/node-fetch.injectable";

import type { JsonApiConfig, JsonApiDependencies } from "@kubesightapp/json-api";

export type CreateKubeJsonApi = (config: JsonApiConfig, reqInit?: NodeFetchRequestInit) => KubeJsonApi;

const createKubeJsonApiInjectable = getInjectable({
  id: "create-kube-json-api",
  instantiate: (di): CreateKubeJsonApi => {
    const dependencies: JsonApiDependencies = {
      fetch: di.inject(nodeFetchInjectable),
      logger: di.inject(loggerInjectionToken),
    };
    const lensProxyCert = di.inject(lensProxyCertificateInjectable);

    return (config, reqInit) => {
      if (!config.getRequestOptions) {
        config.getRequestOptions = async () => {
          const agent = new Agent({
            ca: lensProxyCert.get().cert,
          });

          console.log({
            "User-Agent": `K8Sight/${packageJson.version}`,
          });

          return {
            agent,
            headers: {
              "User-Agent": `K8Sight/${packageJson.version}`,
            },
          };
        };
      }

      return new KubeJsonApi(dependencies, config, reqInit);
    };
  },
});

export default createKubeJsonApiInjectable;
