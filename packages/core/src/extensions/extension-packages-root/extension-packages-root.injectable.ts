import { getInjectable } from "@ogre-tools/injectable";
import directoryForUserDataInjectable from "../../common/app-paths/directory-for-user-data/directory-for-user-data.injectable";

const extensionPackagesRootInjectable = getInjectable({
  id: "extension-packages-root",
  instantiate: (di) => di.inject(directoryForUserDataInjectable),
});

export default extensionPackagesRootInjectable;
