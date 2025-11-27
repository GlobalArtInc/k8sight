import { getInjectable } from "@ogre-tools/injectable";
import { ipcRendererOn } from "../../common/ipc";

const legacyOnChannelListenInjectable = getInjectable({
  id: "legacy-on-channel-listen",
  instantiate: () => ipcRendererOn,
  causesSideEffects: true,
});

export default legacyOnChannelListenInjectable;
