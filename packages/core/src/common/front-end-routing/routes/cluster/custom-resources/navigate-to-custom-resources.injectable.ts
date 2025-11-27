import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../navigate-to-route-injection-token";
import customResourcesRouteInjectable from "./custom-resources-route.injectable";

import type { CustomResourcesPathParameters } from "./custom-resources-route.injectable";

export type NavigateToCustomResources = (parameters: CustomResourcesPathParameters) => void;

const navigateToCustomResourcesInjectable = getInjectable({
  id: "navigate-to-custom-resources",

  instantiate: (di): NavigateToCustomResources => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(customResourcesRouteInjectable);

    return (parameters) => navigateToRoute(route, { parameters });
  },
});

export default navigateToCustomResourcesInjectable;
