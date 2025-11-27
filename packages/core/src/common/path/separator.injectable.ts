import { getInjectable } from "@ogre-tools/injectable";
import path from "path";

const fileSystemSeparatorInjectable = getInjectable({
  id: "file-system-separator",
  instantiate: () => path.sep,
  causesSideEffects: true,
});

export default fileSystemSeparatorInjectable;
