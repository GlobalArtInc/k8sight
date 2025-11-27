import { getGlobalOverride } from "@kubesightapp/test-utils";
import extractTarInjectable from "./extract-tar.injectable";

export default getGlobalOverride(extractTarInjectable, () => async () => {
  throw new Error("tried to extract a tar file without override");
});
