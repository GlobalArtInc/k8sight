import { getInjectable } from "@ogre-tools/injectable";
import { getK8sightLikeQueryFor } from "./k8sight-provider.injectable";
import { createPrometheusProvider, findFirstNamespacedService, prometheusProviderInjectionToken } from "./provider";

const helm14PrometheusProviderInjectable = getInjectable({
  id: "helm14-prometheus-provider",
  instantiate: () =>
    createPrometheusProvider({
      kind: "helm14",
      name: "Helm 14.x",
      isConfigurable: true,
      getQuery: getK8sightLikeQueryFor({ rateAccuracy: "5m" }),
      getService: (client) => findFirstNamespacedService(client, "app=prometheus,component=server,heritage=Helm"),
    }),
  injectionToken: prometheusProviderInjectionToken,
});

export default helm14PrometheusProviderInjectable;
