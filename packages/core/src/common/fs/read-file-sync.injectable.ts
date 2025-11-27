import { getInjectable } from "@ogre-tools/injectable";
import fsInjectable from "./fs.injectable";

export type ReadFileSync = (filePath: string) => string;

const readFileSyncInjectable = getInjectable({
  id: "read-file-sync",
  instantiate: (di): ReadFileSync => {
    const { readFileSync } = di.inject(fsInjectable);

    return (filePath) => readFileSync(filePath, "utf-8");
  },
});

export default readFileSyncInjectable;
