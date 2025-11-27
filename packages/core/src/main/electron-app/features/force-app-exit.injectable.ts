import { getInjectable } from "@ogre-tools/injectable";
import electronAppInjectable from "../electron-app.injectable";

const forceAppExitInjectable = getInjectable({
  id: "force-app-exit",

  instantiate: (di) => () => {
    const app = di.inject(electronAppInjectable);

    app.exit(0);
  },
});

export default forceAppExitInjectable;
