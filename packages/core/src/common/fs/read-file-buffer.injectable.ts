import { getInjectable } from "@ogre-tools/injectable";
import fsInjectable from "./fs.injectable";

const readFileBufferInjectable = getInjectable({
  id: "read-file-buffer",

  instantiate: (di) => (filePath: string) => di.inject(fsInjectable).readFile(filePath),
});

export default readFileBufferInjectable;
