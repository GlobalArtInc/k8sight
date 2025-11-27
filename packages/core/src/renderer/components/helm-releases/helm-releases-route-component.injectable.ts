import { getInjectable } from "@ogre-tools/injectable";
import helmReleasesRouteInjectable from "../../../common/front-end-routing/routes/cluster/helm/releases/helm-releases-route.injectable";
import { routeSpecificComponentInjectionToken } from "../../routes/route-specific-component-injection-token";
import { HelmReleases } from "./releases";

const helmReleasesRouteComponentInjectable = getInjectable({
  id: "helm-releases-route-component",

  instantiate: (di) => ({
    route: di.inject(helmReleasesRouteInjectable),
    Component: HelmReleases,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default helmReleasesRouteComponentInjectable;
