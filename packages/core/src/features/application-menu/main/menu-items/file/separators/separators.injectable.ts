import { getApplicationMenuSeparatorInjectable } from "../../get-application-menu-separator-injectable";

export const separator1 = getApplicationMenuSeparatorInjectable({
  id: "separator-1-for-file",
  parentId: "file",
  orderNumber: 20,
  isShownOnlyOnMac: true,
});
