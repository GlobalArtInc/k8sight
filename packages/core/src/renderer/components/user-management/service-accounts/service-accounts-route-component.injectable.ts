import { getInjectable } from "@ogre-tools/injectable";
import serviceAccountsRouteInjectable from "../../../../common/front-end-routing/routes/cluster/user-management/service-accounts/service-accounts-route.injectable";
import { routeSpecificComponentInjectionToken } from "../../../routes/route-specific-component-injection-token";
import { ServiceAccounts } from "./view";

const serviceAccountsRouteComponentInjectable = getInjectable({
  id: "service-accounts-route-component",

  instantiate: (di) => ({
    route: di.inject(serviceAccountsRouteInjectable),
    Component: ServiceAccounts,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default serviceAccountsRouteComponentInjectable;
