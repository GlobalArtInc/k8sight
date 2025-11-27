import { getInjectable } from "@ogre-tools/injectable";
import { navigateToRouteInjectionToken } from "../../../../navigate-to-route-injection-token";
import mutatingWebhookConfigurationsRouteInjectable from "./mutating-webhook-configurations-route.injectable";

const navigateToMutatingWebhookConfigurationsInjectable = getInjectable({
  id: "navigate-to-mutating-webhook-configurations",

  instantiate: (di) => {
    const navigateToRoute = di.inject(navigateToRouteInjectionToken);
    const route = di.inject(mutatingWebhookConfigurationsRouteInjectable);

    return () => navigateToRoute(route);
  },
});

export default navigateToMutatingWebhookConfigurationsInjectable;
