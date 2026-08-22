import { computedOr } from "@kubesightapp/utilities";
import { getInjectable } from "@ogre-tools/injectable";
import { shouldShowResourceInjectionToken } from "../../../../../features/cluster/showing-kube-resources/common/allowed-resources-injection-token";
import { frontEndRouteInjectionToken } from "../../../front-end-route-injection-token";

/**
 * Enabled on any cluster that serves something Flux reconciles, so the dashboard is there for a
 * partial install -- sources only, say -- rather than demanding the full toolkit.
 */
const fluxDashboardRouteInjectable = getInjectable({
  id: "flux-dashboard-route",

  instantiate: (di) => ({
    path: "/flux",
    clusterFrame: true,
    isEnabled: computedOr(
      di.inject(shouldShowResourceInjectionToken, {
        group: "kustomize.toolkit.fluxcd.io",
        apiName: "kustomizations",
      }),
      di.inject(shouldShowResourceInjectionToken, {
        group: "helm.toolkit.fluxcd.io",
        apiName: "helmreleases",
      }),
      di.inject(shouldShowResourceInjectionToken, {
        group: "source.toolkit.fluxcd.io",
        apiName: "gitrepositories",
      }),
    ),
  }),

  injectionToken: frontEndRouteInjectionToken,
});

export default fluxDashboardRouteInjectable;
