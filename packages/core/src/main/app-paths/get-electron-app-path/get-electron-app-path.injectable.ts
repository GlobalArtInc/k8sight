import { getInjectable } from "@ogre-tools/injectable";
import electronAppInjectable from "../../electron-app/electron-app.injectable";

import type { PathName } from "../../../common/app-paths/app-path-names";

export type GetElectronAppPath = (name: PathName | "currentApp") => string;

const getElectronAppPathInjectable = getInjectable({
  id: "get-electron-app-path",

  instantiate: (di): GetElectronAppPath => {
    const electronApp = di.inject(electronAppInjectable);

    return (name) => {
      try {
        if (name === "currentApp") {
          return electronApp.getAppPath();
        }

        return electronApp.getPath(name);
      } catch (e) {
        return "";
      }
    };
  },
});

export default getElectronAppPathInjectable;
