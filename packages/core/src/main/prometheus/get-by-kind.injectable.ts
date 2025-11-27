import { getInjectable } from "@ogre-tools/injectable";
import { matches } from "lodash/fp";
import prometheusProvidersInjectable from "./providers.injectable";

import type { PrometheusProvider } from "@kubesightapp/prometheus";

export type GetPrometheusProviderByKind = (kind: string) => PrometheusProvider;

const getPrometheusProviderByKindInjectable = getInjectable({
  id: "get-prometheus-provider-by-kind",
  instantiate: (di): GetPrometheusProviderByKind => {
    const providers = di.inject(prometheusProvidersInjectable);

    return (kind) => {
      const provider = providers.get().find(matches({ kind }));

      if (!provider) {
        throw new Error(`Provider of kind "${kind}" does not exist`);
      }

      return provider;
    };
  },
});

export default getPrometheusProviderByKindInjectable;
