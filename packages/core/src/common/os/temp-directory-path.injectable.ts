import { getInjectable } from "@ogre-tools/injectable";
import { tmpdir } from "os";

const tempDirectoryPathInjectable = getInjectable({
  id: "temp-directory-path",
  instantiate: () => tmpdir(),
  causesSideEffects: true,
});

export default tempDirectoryPathInjectable;
