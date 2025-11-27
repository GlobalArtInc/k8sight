import { getInjectable } from "@ogre-tools/injectable";

export interface ChartCacheEntry {
  data: string; // serialized JSON
  mtimeMs: number;
}

export type HelmChartManagerCache = Map<string, ChartCacheEntry>;

const helmChartManagerCacheInjectable = getInjectable({
  id: "helm-chart-manager-cache",
  instantiate: (): HelmChartManagerCache => new Map(),
});

export default helmChartManagerCacheInjectable;
