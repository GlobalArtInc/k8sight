import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../common/front-end-routing/navigate-to-route-injection-token";
import customResourcesRouteInjectable from "../../../common/front-end-routing/routes/cluster/custom-resources/custom-resources-route.injectable";
import searchUrlPageParamInjectable from "../input/search-url-page-param.injectable";
import kubeDetailsUrlParamInjectable from "../kube-detail-params/kube-details-url.injectable";

import type { FluxKind } from "./flux-resource-kinds";

export interface FluxResourceTarget {
  /** Opens this object's details panel on arrival. */
  selfLink?: string;
  /** Narrows the list, so the object you came for is not buried among hundreds of siblings. */
  search?: string;
}

/**
 * Opens a Flux resource's list, optionally homing in on one object.
 *
 * The details panel belongs to the list page, so seeing why a resource is unhealthy means landing
 * there rather than opening a drawer on the dashboard: the object keeps the context of its
 * siblings, and the usual search, events and YAML editing are all right there.
 */
export type NavigateToFluxResource = (kind: FluxKind, target?: FluxResourceTarget) => void;

const navigateToFluxResourceInjectable = getInjectable({
  id: "navigate-to-flux-resource",

  instantiate: (di): NavigateToFluxResource => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const customResourcesRoute = di.inject(customResourcesRouteInjectable);
    const kubeDetailsUrlParam = di.inject(kubeDetailsUrlParamInjectable);
    const searchUrlPageParam = di.inject(searchUrlPageParamInjectable);

    return (kind, { selfLink, search } = {}) => {
      const query: Record<string, string> = {};

      if (selfLink) {
        query[kubeDetailsUrlParam.name] = selfLink;
      }

      if (search) {
        query[searchUrlPageParam.name] = search;
      }

      navigateToRoute(customResourcesRoute, {
        parameters: { group: kind.group, name: kind.plural },
        query: Object.keys(query).length > 0 ? query : undefined,
      });
    };
  },
});

export default navigateToFluxResourceInjectable;
