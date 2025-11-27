import { prometheusProviderInjectionToken } from "@kubesightapp/prometheus";
import { getInjectable } from "@ogre-tools/injectable";
import { computedInjectManyInjectable } from "@ogre-tools/injectable-extension-for-mobx";

const prometheusProvidersInjectable = getInjectable({
  id: "prometheus-providers",
  instantiate: (di) => {
    const computedInjectMany = di.inject(computedInjectManyInjectable);

    return computedInjectMany(prometheusProviderInjectionToken);
  },
});

export default prometheusProvidersInjectable;
