import { getInjectable } from "@ogre-tools/injectable";
import process from "process";

const processEnvInjectable = getInjectable({
  id: "process-env",
  instantiate: () => process.env,
  causesSideEffects: true,
});

export default processEnvInjectable;
