import { loggerInjectionToken } from "@kubesightapp/logger";
import { getInjectable, lifecycleEnum } from "@ogre-tools/injectable";
import getPrometheusProviderByKindInjectable from "../../prometheus/get-by-kind.injectable";
import prometheusProvidersInjectable from "../../prometheus/providers.injectable";
import loadProxyKubeconfigInjectable from "../load-proxy-kubeconfig.injectable";
import { createClusterPrometheusHandler } from "./prometheus-handler";

import type { Cluster } from "../../../common/cluster/cluster";

const prometheusHandlerInjectable = getInjectable({
  id: "prometheus-handler",

  instantiate: (di, cluster) =>
    createClusterPrometheusHandler(
      {
        getPrometheusProviderByKind: di.inject(getPrometheusProviderByKindInjectable),
        prometheusProviders: di.inject(prometheusProvidersInjectable),
        logger: di.inject(loggerInjectionToken),
        loadProxyKubeconfig: di.inject(loadProxyKubeconfigInjectable, cluster),
      },
      cluster,
    ),
  lifecycle: lifecycleEnum.keyedSingleton({
    getInstanceKey: (di, cluster: Cluster) => cluster.id,
  }),
});

export default prometheusHandlerInjectable;
