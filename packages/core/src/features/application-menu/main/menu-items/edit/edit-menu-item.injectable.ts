import { getInjectable } from "@ogre-tools/injectable";
import applicationMenuItemInjectionToken from "../application-menu-item-injection-token";

const editMenuItemInjectable = getInjectable({
  id: "edit-application-menu-item",

  instantiate: () => ({
    kind: "top-level-menu" as const,
    id: "edit",
    parentId: "root" as const,
    orderNumber: 30,
    label: "Edit",
  }),

  injectionToken: applicationMenuItemInjectionToken,
});

export default editMenuItemInjectable;
