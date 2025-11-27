import { getGlobalOverride } from "@kubesightapp/test-utils";
import watchInjectable from "./watch.injectable";

export default getGlobalOverride(watchInjectable, () => () => {
  throw new Error("Tried to call file system watch without explicit override");
});
