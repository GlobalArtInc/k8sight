import { getInjectable } from "@ogre-tools/injectable";
import { NotificationsStore } from "./notifications.store";

export const notificationsStoreInjectable = getInjectable({
  id: "notifications-store",
  instantiate: () => new NotificationsStore(),
});
