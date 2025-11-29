import { getInjectable } from "@ogre-tools/injectable";
import { reaction } from "mobx";
import initializeSystemThemeTypeInjectable from "../../features/theme/system-type/renderer/initialize.injectable";
import initUserStoreInjectable from "../../features/user-preferences/renderer/load-storage.injectable";
import { beforeFrameStartsSecondInjectionToken } from "../before-frame-starts/tokens";
import activeThemeInjectable from "./active.injectable";
import applyThemeInjectable from "./apply-k8sight-theme.injectable";

const setupApplyActiveThemeInjectable = getInjectable({
  id: "setup-apply-active-theme",
  instantiate: (di) => ({
    run: () => {
      const activeTheme = di.inject(activeThemeInjectable);
      const applyTheme = di.inject(applyThemeInjectable);

      reaction(() => activeTheme.get(), applyTheme, {
        fireImmediately: true,
      });
    },
    runAfter: [initializeSystemThemeTypeInjectable, initUserStoreInjectable],
  }),
  injectionToken: beforeFrameStartsSecondInjectionToken,
});

export default setupApplyActiveThemeInjectable;
