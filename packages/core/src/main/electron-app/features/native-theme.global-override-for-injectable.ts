import { getGlobalOverride } from "@kubesightapp/test-utils";
import EventEmitter from "events";
import nativeThemeInjectable from "./native-theme.injectable";

export default getGlobalOverride(nativeThemeInjectable, () =>
  Object.assign(new EventEmitter(), {
    shouldUseDarkColors: true,
    inForcedColorsMode: true,
    shouldUseHighContrastColors: false,
    shouldUseInvertedColorScheme: false,
    shouldUseDarkColorsForSystemIntegratedUI: true,
    prefersReducedTransparency: false,
    themeSource: "dark" as const,
  }),
);
