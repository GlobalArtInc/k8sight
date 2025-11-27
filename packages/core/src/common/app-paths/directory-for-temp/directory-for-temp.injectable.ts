import { getInjectable } from "@ogre-tools/injectable";
import appPathsInjectable from "../app-paths.injectable";

const directoryForTempInjectable = getInjectable({
  id: "directory-for-temp",
  instantiate: (di) => di.inject(appPathsInjectable).temp,
});

export default directoryForTempInjectable;
