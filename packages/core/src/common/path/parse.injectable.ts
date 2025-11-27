import { getInjectable } from "@ogre-tools/injectable";
import path from "path";

const parsePathInjectable = getInjectable({
  id: "parse-path",
  instantiate: () => path.parse,
  causesSideEffects: true,
});

export default parsePathInjectable;
