import { urlBuilderFor } from "@kubesightapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";
import apiBaseInjectable from "../../api-base.injectable";

import type { AsyncResult } from "@kubesightapp/utilities";

const requestReadmeEndpoint = urlBuilderFor("/v2/charts/:repo/:name/readme");

export type RequestHelmChartReadme = (repo: string, name: string, version?: string) => AsyncResult<string>;

const requestHelmChartReadmeInjectable = getInjectable({
  id: "request-helm-chart-readme",
  instantiate: (di): RequestHelmChartReadme => {
    const apiBase = di.inject(apiBaseInjectable);

    return (repo, name, version) => apiBase.get(requestReadmeEndpoint.compile({ name, repo }, { version }));
  },
});

export default requestHelmChartReadmeInjectable;
