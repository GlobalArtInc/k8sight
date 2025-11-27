import { getGlobalOverride } from "@kubesightapp/test-utils";
import bootstrapInjectable from "./bootstrap.injectable";

export default getGlobalOverride(bootstrapInjectable, () => ({
  run: () => {},
}));
