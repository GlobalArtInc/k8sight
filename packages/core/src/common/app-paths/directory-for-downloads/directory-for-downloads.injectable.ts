import { getInjectable } from "@ogre-tools/injectable";
import appPathsInjectable from "../app-paths.injectable";

const directoryForDownloadsInjectable = getInjectable({
  id: "directory-for-downloads",
  instantiate: (di) => di.inject(appPathsInjectable).downloads,
});

export default directoryForDownloadsInjectable;
