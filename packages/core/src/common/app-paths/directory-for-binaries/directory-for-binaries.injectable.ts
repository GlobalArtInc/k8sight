import { getInjectable } from "@ogre-tools/injectable";
import joinPathsInjectable from "../../path/join-paths.injectable";
import directoryForUserDataInjectable from "../directory-for-user-data/directory-for-user-data.injectable";

const directoryForBinariesInjectable = getInjectable({
  id: "directory-for-binaries",

  instantiate: (di) => {
    const joinPaths = di.inject(joinPathsInjectable);
    const directoryForUserData = di.inject(directoryForUserDataInjectable);

    return joinPaths(directoryForUserData, "binaries");
  },
});

export default directoryForBinariesInjectable;
