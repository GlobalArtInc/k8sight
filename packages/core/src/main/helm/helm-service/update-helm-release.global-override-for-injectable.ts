import { getGlobalOverride } from "@kubesightapp/test-utils";
import updateHelmReleaseInjectable from "./update-helm-release.injectable";

export default getGlobalOverride(updateHelmReleaseInjectable, () => () => {
  throw new Error("Tried to update helm release without explicit override");
});
