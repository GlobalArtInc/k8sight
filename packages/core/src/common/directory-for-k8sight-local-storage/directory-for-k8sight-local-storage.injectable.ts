import { getInjectable } from "@ogre-tools/injectable";
import directoryForUserDataInjectable from "../app-paths/directory-for-user-data/directory-for-user-data.injectable";
import joinPathsInjectable from "../path/join-paths.injectable";

const directoryForK8sightLocalStorageInjectable = getInjectable({
  id: "directory-for-k8sight-local-storage",

  instantiate: (di) => {
    const joinPaths = di.inject(joinPathsInjectable);
    const directoryForUserData = di.inject(directoryForUserDataInjectable);

    return joinPaths(directoryForUserData, "k8sight-local-storage");
  },
});

export default directoryForK8sightLocalStorageInjectable;
