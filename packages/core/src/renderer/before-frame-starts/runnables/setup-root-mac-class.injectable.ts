import { getInjectable } from "@ogre-tools/injectable";
import isMacInjectable from "../../../common/vars/is-mac.injectable";
import { beforeFrameStartsSecondInjectionToken } from "../tokens";

const setupRootMacClassnameInjectable = getInjectable({
  id: "setup-root-mac-classname",
  instantiate: (di) => ({
    run: () => {
      const isMac = di.inject(isMacInjectable);
      const rootElem = document.getElementById("app");

      rootElem?.classList.toggle("is-mac", isMac);
    },
  }),
  injectionToken: beforeFrameStartsSecondInjectionToken,
});

export default setupRootMacClassnameInjectable;
