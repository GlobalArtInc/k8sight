import { getGlobalOverride } from "@kubesightapp/test-utils";
import k8sightCreateResourceTemplatesInjectable from "./k8sight-templates.injectable";

export default getGlobalOverride(k8sightCreateResourceTemplatesInjectable, () => ({
  label: "k8sight",
  options: [],
}));
