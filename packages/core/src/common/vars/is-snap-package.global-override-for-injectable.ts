import { getGlobalOverride } from "@kubesightapp/test-utils";
import isSnapPackageInjectable from "./is-snap-package.injectable";

export default getGlobalOverride(isSnapPackageInjectable, () => false);
