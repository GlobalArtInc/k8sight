import { rootFrameChildComponentInjectionToken } from "@kubesightapp/react-application";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { Notifications } from "./notifications";

export const notificationsRootFrameChildComponentInjectable = getInjectable({
  id: "notifications-root-frame-child-component",

  instantiate: () => ({
    id: "notifications",
    shouldRender: computed(() => true),
    Component: Notifications,
  }),

  injectionToken: rootFrameChildComponentInjectionToken,
});
