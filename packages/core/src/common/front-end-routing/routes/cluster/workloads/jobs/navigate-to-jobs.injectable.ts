import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../../navigate-to-route-injection-token";
import jobsRouteInjectable from "./jobs-route.injectable";

const navigateToJobsInjectable = getInjectable({
  id: "navigate-to-jobs",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(jobsRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToJobsInjectable;
