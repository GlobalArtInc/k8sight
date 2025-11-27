import { getInjectable } from "@ogre-tools/injectable";
import { action } from "mobx";
import statusBarCurrentStatusInjectable from "./current-status.injectable";

import type { StatusBarStatus } from "./current-status.injectable";

export type SetStatusBarStatus = (newStatus: StatusBarStatus) => void;

const setStatusBarStatusInjectable = getInjectable({
  id: "set-status-bar-status",
  instantiate: (di): SetStatusBarStatus => {
    const status = di.inject(statusBarCurrentStatusInjectable);

    return action((newStatus) => status.set(newStatus));
  },
});

export default setStatusBarStatusInjectable;
