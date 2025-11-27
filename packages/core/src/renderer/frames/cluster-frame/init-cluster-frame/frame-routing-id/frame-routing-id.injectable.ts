import { getInjectable } from "@ogre-tools/injectable";
import webFrameInjectable from "./web-frame/web-frame.injectable";

const frameRoutingIdInjectable = getInjectable({
  id: "frame-routing-id",
  instantiate: (di) => di.inject(webFrameInjectable).routingId,
});

export default frameRoutingIdInjectable;
