import { urlBuilderFor } from "@kubesightapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";
import yaml from "js-yaml";
import apiBaseInjectable from "../../api-base.injectable";

import type { HelmReleaseUpdateDetails } from "../helm-releases.api";

interface HelmReleaseCreatePayload {
  name?: string;
  repo: string;
  chart: string;
  namespace: string;
  version: string;
  values: string;
  forceConflicts?: boolean;
}

export type RequestCreateHelmRelease = (payload: HelmReleaseCreatePayload) => Promise<HelmReleaseUpdateDetails>;

const requestCreateEndpoint = urlBuilderFor("/v2/releases");

const requestCreateHelmReleaseInjectable = getInjectable({
  id: "request-create-helm-release",

  instantiate: (di): RequestCreateHelmRelease => {
    const apiBase = di.inject(apiBaseInjectable);

    return ({ repo, chart, values, ...data }) => {
      return apiBase.post(requestCreateEndpoint.compile({}), {
        data: {
          chart: `${repo}/${chart}`,
          values: yaml.load(values),
          ...data,
        },
      });
    };
  },
});

export default requestCreateHelmReleaseInjectable;
