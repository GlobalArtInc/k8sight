import { getInjectable } from "@ogre-tools/injectable";
import { preferenceItemInjectionToken } from "../../preference-item-injection-token";
import { LiveFrames } from "./live-frames";

const liveFramesPreferenceBlockInjectable = getInjectable({
  id: "live-frames-preference-item",

  instantiate: () => ({
    kind: "block" as const,
    id: "live-frames",
    parentId: "application-page",
    orderNumber: 35,
    Component: LiveFrames,
  }),

  injectionToken: preferenceItemInjectionToken,
});

export default liveFramesPreferenceBlockInjectable;
