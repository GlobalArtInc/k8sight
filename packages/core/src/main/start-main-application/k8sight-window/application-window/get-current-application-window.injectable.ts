import { getInjectable } from "@ogre-tools/injectable";
import { first } from "lodash/fp";
import { applicationWindowInjectionToken } from "./application-window-injection-token";

const getCurrentApplicationWindowInjectable = getInjectable({
  id: "get-current-application-window",

  instantiate: (di) => () => first(di.injectMany(applicationWindowInjectionToken)),
});

export default getCurrentApplicationWindowInjectable;
