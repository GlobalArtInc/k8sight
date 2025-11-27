import { getInjectable } from "@ogre-tools/injectable";
import { nodeEnvInjectionToken } from "../main/library";

const nodeEnvForTestingEnvInjectable = getInjectable({
  id: "node-env-for-testing-env",
  instantiate: () => "production",
  injectionToken: nodeEnvInjectionToken,
});

export default nodeEnvForTestingEnvInjectable;
