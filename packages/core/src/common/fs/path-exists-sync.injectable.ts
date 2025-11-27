import { getInjectable } from "@ogre-tools/injectable";
import fsInjectable from "./fs.injectable";

const pathExistsSyncInjectable = getInjectable({
  id: "path-exists-sync",
  instantiate: (di) => di.inject(fsInjectable).pathExistsSync,
});

export default pathExistsSyncInjectable;
