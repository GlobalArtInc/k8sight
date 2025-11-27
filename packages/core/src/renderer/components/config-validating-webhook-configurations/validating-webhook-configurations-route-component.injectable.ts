import { getInjectable } from "@ogre-tools/injectable";
import validatingWebhookConfigurationsRouteInjectable from "../../../common/front-end-routing/routes/cluster/config/validating-webhook-configurations/validating-webhook-configurations-route.injectable";
import { routeSpecificComponentInjectionToken } from "../../routes/route-specific-component-injection-token";
import { ValidatingWebhookConfigurations } from "./validating-webhook-configurations";

const validatingWebhookConfigurationsRouteComponentInjectable = getInjectable({
  id: "validating-webhook-configuration-route-component",

  instantiate: (di) => ({
    route: di.inject(validatingWebhookConfigurationsRouteInjectable),
    Component: ValidatingWebhookConfigurations,
  }),

  injectionToken: routeSpecificComponentInjectionToken,
});

export default validatingWebhookConfigurationsRouteComponentInjectable;
