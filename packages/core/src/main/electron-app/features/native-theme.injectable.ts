import { getInjectable } from "@ogre-tools/injectable";
import { nativeTheme } from "electron";

const nativeThemeInjectable = getInjectable({
  id: "native-theme",
  instantiate: () => nativeTheme,
  causesSideEffects: true,
});

export default nativeThemeInjectable;
