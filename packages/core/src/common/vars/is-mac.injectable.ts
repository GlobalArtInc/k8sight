import { getInjectable } from "@ogre-tools/injectable";
import platformInjectable from "./platform.injectable";

const isMacInjectable = getInjectable({
  id: "is-mac",

  instantiate: (di) => {
    const platform = di.inject(platformInjectable);

    return platform === "darwin";
  },
});

export default isMacInjectable;
