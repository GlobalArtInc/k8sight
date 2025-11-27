import { getInjectable } from "@ogre-tools/injectable";
import fsInjectable from "./fs.injectable";

import type { CopyOptions } from "fs-extra";

export type Copy = (src: string, dest: string, options?: CopyOptions | undefined) => Promise<void>;

const copyInjectable = getInjectable({
  id: "copy",
  instantiate: (di): Copy => di.inject(fsInjectable).copy,
});

export default copyInjectable;
