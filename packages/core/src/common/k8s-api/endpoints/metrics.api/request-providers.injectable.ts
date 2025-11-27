import { getInjectable } from "@ogre-tools/injectable";
import apiBaseInjectable from "../../api-base.injectable";

export interface MetricProviderInfo {
  name: string;
  id: string;
  isConfigurable: boolean;
}

export type RequestMetricsProviders = () => Promise<MetricProviderInfo[]>;

const requestMetricsProvidersInjectable = getInjectable({
  id: "request-metrics-providers",
  instantiate: (di): RequestMetricsProviders => {
    const apiBase = di.inject(apiBaseInjectable);

    return () => apiBase.get("/metrics/providers");
  },
});

export default requestMetricsProvidersInjectable;
