import { getInjectable } from "@ogre-tools/injectable";
import { nodeEnvInjectionToken } from "./node-env-injection-token";

const isProductionInjectable = getInjectable({
  id: "is-production",

  instantiate: (di) => {
    const nodeEnv = di.inject(nodeEnvInjectionToken);

    return nodeEnv !== "development";
  },
});

export default isProductionInjectable;
