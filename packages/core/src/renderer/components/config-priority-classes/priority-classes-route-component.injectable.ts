import { getInjectable } from "@ogre-tools/injectable";
import priorityClassesRouteInjectable from "../../../common/front-end-routing/routes/cluster/config/priority-classes/priority-classes-route.injectable";
import { routeSpecificComponentInjectionToken } from "../../routes/route-specific-component-injection-token";
import { PriorityClasses } from "./priority-classes";

const priorityClassesRouteComponentInjectable = getInjectable({
  id: "priority-classes-route-component",

  instantiate: (di) => ({
    route: di.inject(priorityClassesRouteInjectable),
    Component: PriorityClasses,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default priorityClassesRouteComponentInjectable;
