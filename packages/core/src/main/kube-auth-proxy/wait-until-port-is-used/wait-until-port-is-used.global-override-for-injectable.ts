import { getGlobalOverride } from "@kubesightapp/test-utils";
import waitUntilPortIsUsedInjectable from "./wait-until-port-is-used.injectable";

export default getGlobalOverride(waitUntilPortIsUsedInjectable, () => () => {
  throw new Error("Tried to wait until port is used without explicit override.");
});
