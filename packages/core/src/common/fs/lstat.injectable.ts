import { getInjectable } from "@ogre-tools/injectable";
import fsInjectable from "./fs.injectable";
import type { Stats } from "fs";

export type LStat = (path: string) => Promise<Stats>;

const lstatInjectable = getInjectable({
  id: "lstat",
  instantiate: (di): LStat => di.inject(fsInjectable).lstat,
});

export default lstatInjectable;
