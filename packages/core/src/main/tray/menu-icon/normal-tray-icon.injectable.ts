import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import getTrayIconPathInjectable from "./get-tray-icon-path.injectable";
import { trayIconInjectionToken } from "./tray-icon-injection-token";

const normalTrayIconInjectable = getInjectable({
  id: "normal-icon",

  instantiate: (di) => {
    const getTrayIconPath = di.inject(getTrayIconPathInjectable);

    return {
      iconPath: getTrayIconPath(""),
      priority: 999,
      shouldBeShown: computed(() => true),
    };
  },

  injectionToken: trayIconInjectionToken,
});

export default normalTrayIconInjectable;
