import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

export type StatusBarStatus = "default" | "warning" | "error";

const statusBarCurrentStatusInjectable = getInjectable({
  id: "status-bar-current-status",
  instantiate: () => observable.box<StatusBarStatus>("default"),
});

export default statusBarCurrentStatusInjectable;
