import { getInjectable } from "@ogre-tools/injectable";
import electronAppInjectable from "../electron-app.injectable";

const focusApplicationInjectable = getInjectable({
  id: "focus-application",

  instantiate: (di) => {
    const electronApp = di.inject(electronAppInjectable);

    return () => {
      electronApp.focus({ steal: true });
    };
  },
});

export default focusApplicationInjectable;
