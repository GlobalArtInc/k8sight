import { getInjectable } from "@ogre-tools/injectable";
import platformInjectable from "./platform.injectable";

const isWindowsInjectable = getInjectable({
  id: "is-windows",

  instantiate: (di) => {
    const platform = di.inject(platformInjectable);

    return platform === "win32";
  },
});

export default isWindowsInjectable;
