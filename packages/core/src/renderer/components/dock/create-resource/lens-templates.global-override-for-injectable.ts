import { getGlobalOverride } from "@kubesightapp/test-utils";
import lensCreateResourceTemplatesInjectable from "./lens-templates.injectable";

export default getGlobalOverride(lensCreateResourceTemplatesInjectable, () => ({
  label: "lens",
  options: [],
}));
