import { JsonApi } from "@kubesightapp/json-api";
import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable } from "@ogre-tools/injectable";
import { Agent } from "https";
import k8sightProxyCertificateInjectable from "../certificate/k8sight-proxy-certificate.injectable";
import nodeFetchInjectable from "../fetch/node-fetch.injectable";

import type { JsonApiConfig, JsonApiData, JsonApiDependencies, JsonApiParams } from "@kubesightapp/json-api";
import type { RequestInit } from "@kubesightapp/node-fetch";

export type CreateJsonApi = <Data = JsonApiData, Params extends JsonApiParams<Data> = JsonApiParams<Data>>(
  config: JsonApiConfig,
  reqInit?: RequestInit,
) => JsonApi<Data, Params>;

const createJsonApiInjectable = getInjectable({
  id: "create-json-api",
  instantiate: (di): CreateJsonApi => {
    const deps: JsonApiDependencies = {
      fetch: di.inject(nodeFetchInjectable),
      logger: di.inject(loggerInjectionToken),
    };
    const k8sightProxyCert = di.inject(k8sightProxyCertificateInjectable);

    return (config, reqInit) => {
      if (!config.getRequestOptions) {
        config.getRequestOptions = async () => {
          const agent = new Agent({
            ca: k8sightProxyCert.get().cert,
          });

          // MSD Agent and Node Agent are not compatible
          return {
            agent,
          } as any;
        };
      }

      // MSD RequestInit and Node RequestInit are not compatible
      return new JsonApi(deps, config, reqInit as any);
    };
  },
});

export default createJsonApiInjectable;
