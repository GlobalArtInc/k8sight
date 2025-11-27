import { getInjectable } from "@ogre-tools/injectable";
import fsInjectable from "./fs.injectable";

export type PathExists = (path: string) => Promise<boolean>;

const pathExistsInjectable = getInjectable({
  id: "path-exists",
  instantiate: (di): PathExists => di.inject(fsInjectable).pathExists,
});

export default pathExistsInjectable;
