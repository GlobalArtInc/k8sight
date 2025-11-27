import { getInjectable } from "@ogre-tools/injectable";
import { webFrame } from "electron";

const webFrameInjectable = getInjectable({
  id: "web-frame",
  instantiate: () => webFrame,
  causesSideEffects: true,
});

export default webFrameInjectable;
