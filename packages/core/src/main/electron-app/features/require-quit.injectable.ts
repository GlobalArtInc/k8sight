import { getInjectable } from "@ogre-tools/injectable";
import electronAppInjectable from "../electron-app.injectable";

const requestQuitOfAppInjectable = getInjectable({
  id: "request-quit-of-app",
  instantiate: (di) => {
    const app = di.inject(electronAppInjectable);

    return () => app.quit();
  },
});

export default requestQuitOfAppInjectable;
