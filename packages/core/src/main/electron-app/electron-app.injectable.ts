import { getInjectable } from "@ogre-tools/injectable";
import { app } from "electron";

const electronAppInjectable = getInjectable({
  id: "electron-app",
  instantiate: () => app,
  causesSideEffects: true,
});

export default electronAppInjectable;
