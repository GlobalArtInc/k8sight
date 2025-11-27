import { getInjectable } from "@ogre-tools/injectable";
import electronAppInjectable from "../electron-app.injectable";

const requestSingleInstanceLockInjectable = getInjectable({
  id: "request-single-instance-lock",

  instantiate: (di) => {
    const app = di.inject(electronAppInjectable);

    return () => app.requestSingleInstanceLock();
  },
});

export default requestSingleInstanceLockInjectable;
