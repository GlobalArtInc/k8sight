import { getInjectable } from "@ogre-tools/injectable";
import customResourceDefinitionsRouteInjectable from "../../../common/front-end-routing/routes/cluster/custom-resources/custom-resource-definitions.injectable";
import { routeSpecificComponentInjectionToken } from "../../routes/route-specific-component-injection-token";
import { CustomResourceDefinitions } from "./view";

const customResourceDefinitionsRouteComponentInjectable = getInjectable({
  id: "custom-resource-definitions-route-component",

  instantiate: (di) => ({
    route: di.inject(customResourceDefinitionsRouteInjectable),
    Component: CustomResourceDefinitions,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default customResourceDefinitionsRouteComponentInjectable;
