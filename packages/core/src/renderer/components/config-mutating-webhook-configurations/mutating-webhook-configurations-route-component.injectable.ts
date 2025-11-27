import { getInjectable } from "@ogre-tools/injectable";
import mutatingWebhookConfigurationsRouteInjectable from "../../../common/front-end-routing/routes/cluster/config/mutating-webhook-configurations/mutating-webhook-configurations-route.injectable";
import { routeSpecificComponentInjectionToken } from "../../routes/route-specific-component-injection-token";
import { MutatingWebhookConfigurations } from "./mutating-webhook-configurations";

const mutatingWebhookConfigurationsRouteComponentInjectable = getInjectable({
  id: "mutating-webhook-configuration-route-component",

  instantiate: (di) => ({
    route: di.inject(mutatingWebhookConfigurationsRouteInjectable),
    Component: MutatingWebhookConfigurations,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default mutatingWebhookConfigurationsRouteComponentInjectable;
