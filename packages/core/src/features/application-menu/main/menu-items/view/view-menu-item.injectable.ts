import { getInjectable } from "@ogre-tools/injectable";
import applicationMenuItemInjectionToken from "../application-menu-item-injection-token";

const viewMenuItemInjectable = getInjectable({
  id: "view-application-menu-item",

  instantiate: () => ({
    kind: "top-level-menu" as const,
    parentId: "root" as const,
    id: "view",
    orderNumber: 40,
    label: "View",
  }),

  injectionToken: applicationMenuItemInjectionToken,
});

export default viewMenuItemInjectable;
