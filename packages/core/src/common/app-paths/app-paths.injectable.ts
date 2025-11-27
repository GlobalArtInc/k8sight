import { getInjectable } from "@ogre-tools/injectable";
import appPathsStateInjectable from "./app-paths-state.injectable";

const appPathsInjectable = getInjectable({
  id: "app-paths",
  instantiate: (di) => di.inject(appPathsStateInjectable).get(),
});

export default appPathsInjectable;
