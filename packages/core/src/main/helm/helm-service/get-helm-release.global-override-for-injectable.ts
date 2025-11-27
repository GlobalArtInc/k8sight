import { getGlobalOverride } from "@kubesightapp/test-utils";
import getHelmReleaseInjectable from "./get-helm-release.injectable";

export default getGlobalOverride(getHelmReleaseInjectable, () => () => {
  throw new Error("Tried to get helm release without explicit override");
});
