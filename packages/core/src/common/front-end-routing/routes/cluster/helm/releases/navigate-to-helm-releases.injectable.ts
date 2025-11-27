import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../../navigate-to-route-injection-token";
import helmReleasesRouteInjectable from "./helm-releases-route.injectable";

import type { HelmReleasesPathParameters } from "./helm-releases-route.injectable";

export type NavigateToHelmReleases = (parameters?: HelmReleasesPathParameters) => void;

const navigateToHelmReleasesInjectable = getInjectable({
  id: "navigate-to-helm-releases",

  instantiate: (di): NavigateToHelmReleases => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(helmReleasesRouteInjectable);

    return (parameters) => navigateToRoute(route, { parameters });
  },
});

export default navigateToHelmReleasesInjectable;
