import { getInjectable } from "@ogre-tools/injectable";
import appPathsInjectable from "./app-paths.injectable";

const directoryForLogsInjectable = getInjectable({
  id: "directory-for-logs",
  instantiate: (di) => di.inject(appPathsInjectable).logs,
});

export default directoryForLogsInjectable;
