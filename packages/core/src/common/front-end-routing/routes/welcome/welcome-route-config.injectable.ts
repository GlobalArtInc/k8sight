import { applicationInformationToken } from "@kubesightapp/application";
import { getInjectable } from "@ogre-tools/injectable";

const welcomeRouteConfigInjectable = getInjectable({
  id: "welcome-route-config",

  instantiate: (di) => di.inject(applicationInformationToken).welcomeRoute,
});

export default welcomeRouteConfigInjectable;
