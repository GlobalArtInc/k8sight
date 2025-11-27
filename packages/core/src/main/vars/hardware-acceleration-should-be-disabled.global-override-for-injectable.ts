import { getGlobalOverride } from "@kubesightapp/test-utils";
import hardwareAccelerationShouldBeDisabledInjectable from "./hardware-acceleration-should-be-disabled.injectable";

export default getGlobalOverride(hardwareAccelerationShouldBeDisabledInjectable, () => false);
