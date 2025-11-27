import { getInjectable } from "@ogre-tools/injectable";
import { preferenceItemInjectionToken } from "../preference-item-injection-token";

const proxyPreferenceTabInjectable = getInjectable({
  id: "proxy-preference-tab",

  instantiate: () => ({
    kind: "tab" as const,
    id: "proxy-tab",
    parentId: "general-tab-group" as const,
    pathId: "proxy",
    label: "Proxy",
    orderNumber: 20,
  }),

  injectionToken: preferenceItemInjectionToken,
});

export default proxyPreferenceTabInjectable;
