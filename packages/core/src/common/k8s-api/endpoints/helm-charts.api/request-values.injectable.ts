import { urlBuilderFor } from "@kubesightapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";
import apiBaseInjectable from "../../api-base.injectable";

import type { AsyncResult } from "@kubesightapp/utilities";

const requestValuesEndpoint = urlBuilderFor("/v2/charts/:repo/:name/values");

export type RequestHelmChartValues = (repo: string, name: string, version: string) => AsyncResult<string>;

const requestHelmChartValuesInjectable = getInjectable({
  id: "request-helm-chart-values",
  instantiate: (di): RequestHelmChartValues => {
    const apiBase = di.inject(apiBaseInjectable);

    return (repo, name, version) => apiBase.get(requestValuesEndpoint.compile({ repo, name }, { version }));
  },
});

export default requestHelmChartValuesInjectable;
