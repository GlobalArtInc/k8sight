import { sidebarItemInjectionToken } from "@kubesightapp/cluster-sidebar";
import { computedAnd } from "@kubesightapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";
import { matches } from "lodash";
import { computed } from "mobx";
import customResourcesRouteInjectable from "../../../common/front-end-routing/routes/cluster/custom-resources/custom-resources-route.injectable";
import navigateToCustomResourcesInjectable from "../../../common/front-end-routing/routes/cluster/custom-resources/navigate-to-custom-resources.injectable";
import { shouldShowResourceInjectionToken } from "../../../features/cluster/showing-kube-resources/common/allowed-resources-injection-token";
import routeIsActiveInjectable from "../../routes/route-is-active.injectable";
import routePathParametersInjectable from "../../routes/route-path-parameters.injectable";
import fluxSidebarItemInjectable from "./flux-sidebar-item.injectable";

import type { SidebarItemRegistration } from "@kubesightapp/cluster-sidebar";

export interface FluxResourceSidebarItemOptions {
  /** Defaults to the Flux section itself; group entries pass their own id. */
  parentId?: string;
  /** Injectable id, e.g. `sidebar-item-flux-kustomizations`. */
  id: string;
  title: string;
  /** API group of the Flux CRD, e.g. `kustomize.toolkit.fluxcd.io`. */
  group: string;
  /** Plural resource name, e.g. `kustomizations`. */
  name: string;
  orderNumber: number;
}

/**
 * Builds a Flux navigator entry pointing at the generic custom resource list.
 *
 * Flux CRDs declare useful printer columns -- ready, status, revision, suspended -- and that page
 * renders whatever the CRD declares, so these pages need no tables of their own.
 *
 * Registering them statically, rather than deriving them from the cluster's CRDs, is what lets the
 * root frame's navigator draw them: it builds the hierarchy from its own registrations and learns
 * only which entries a cluster serves from the cluster's frame. Whether Flux is installed is
 * exactly what `shouldShowResource` answers.
 */
export const getFluxResourceSidebarItemInjectable = ({
  id,
  parentId,
  title,
  group,
  name,
  orderNumber,
}: FluxResourceSidebarItemOptions) =>
  getInjectable({
    id,

    instantiate: (di): SidebarItemRegistration => {
      const navigateToCustomResources = di.inject(navigateToCustomResourcesInjectable);
      const customResourcesRoute = di.inject(customResourcesRouteInjectable);
      const pathParameters = di.inject(routePathParametersInjectable, customResourcesRoute);
      const parameters = { group, name };

      return {
        parentId: parentId ?? fluxSidebarItemInjectable.id,
        title,
        onClick: () => navigateToCustomResources(parameters),
        isActive: computedAnd(
          di.inject(routeIsActiveInjectable, customResourcesRoute),
          computed(() => matches(parameters)(pathParameters.get())),
        ),
        isVisible: di.inject(shouldShowResourceInjectionToken, { group, apiName: name }),
        orderNumber,
      };
    },

    injectionToken: sidebarItemInjectionToken,
  });
