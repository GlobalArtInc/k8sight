import { getInjectable } from "@ogre-tools/injectable";
import getDirnameOfPathInjectable from "../path/get-dirname.injectable";
import fsInjectable from "./fs.injectable";

export type WriteFileSync = (filePath: string, contents: string) => void;

const writeFileSyncInjectable = getInjectable({
  id: "write-file-sync",
  instantiate: (di): WriteFileSync => {
    const { writeFileSync, ensureDirSync } = di.inject(fsInjectable);
    const getDirnameOfPath = di.inject(getDirnameOfPathInjectable);

    return (filePath, contents) => {
      ensureDirSync(getDirnameOfPath(filePath), {
        mode: 0o755,
      });
      writeFileSync(filePath, contents);
    };
  },
});

export default writeFileSyncInjectable;
