import { getInjectable } from "@ogre-tools/injectable";
import deploymentsRouteInjectable from "../../../common/front-end-routing/routes/cluster/workloads/deployments/deployments-route.injectable";
import { routeSpecificComponentInjectionToken } from "../../routes/route-specific-component-injection-token";
import { Deployments } from "./deployments";

const deploymentsRouteComponentInjectable = getInjectable({
  id: "deployments-route-component",

  instantiate: (di) => ({
    route: di.inject(deploymentsRouteInjectable),
    Component: Deployments,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default deploymentsRouteComponentInjectable;
