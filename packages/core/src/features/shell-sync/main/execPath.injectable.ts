import { getInjectable } from "@ogre-tools/injectable";
import process from "process";

const processExecPathInjectable = getInjectable({
  id: "process-exec-path",
  instantiate: () => process.execPath,
  causesSideEffects: true,
});

export default processExecPathInjectable;
