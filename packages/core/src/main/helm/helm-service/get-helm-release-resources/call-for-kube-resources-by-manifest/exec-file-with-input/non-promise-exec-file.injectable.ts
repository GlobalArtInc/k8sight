import { getInjectable } from "@ogre-tools/injectable";
import { execFile } from "child_process";

const nonPromiseExecFileInjectable = getInjectable({
  id: "non-promise-exec-file",
  instantiate: () => execFile,
  causesSideEffects: true,
});

export default nonPromiseExecFileInjectable;
