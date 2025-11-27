import { getInjectable } from "@ogre-tools/injectable";
import isProductionInjectable from "./is-production.injectable";

const isDevelopmentInjectable = getInjectable({
  id: "is-development",
  instantiate: (di) => !di.inject(isProductionInjectable),
});

export default isDevelopmentInjectable;
