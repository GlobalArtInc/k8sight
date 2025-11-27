import { getInjectable } from "@ogre-tools/injectable";
import { preferenceItemInjectionToken } from "../../preference-item-injection-token";
import { HotbarAutoHide } from "./hotbar-auto-hide";

const hotbarAutoHidePreferenceBlockInjectable = getInjectable({
  id: "hotbar-auto-hide-preference-item",

  instantiate: () => ({
    kind: "block" as const,
    id: "hotbar-auto-hide",
    parentId: "application-page",
    orderNumber: 31,
    Component: HotbarAutoHide,
  }),

  injectionToken: preferenceItemInjectionToken,
});

export default hotbarAutoHidePreferenceBlockInjectable;
