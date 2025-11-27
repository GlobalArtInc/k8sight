import { getInjectable } from "@ogre-tools/injectable";
import { emitOpenAppMenuAsContextMenu } from "../../../../../../ipc";

const openAppContextMenuInjectable = getInjectable({
  id: "open-app-context-menu",
  instantiate: () => emitOpenAppMenuAsContextMenu,
  causesSideEffects: true,
});

export default openAppContextMenuInjectable;
