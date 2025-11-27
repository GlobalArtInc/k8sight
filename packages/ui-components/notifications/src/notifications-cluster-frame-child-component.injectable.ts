import { clusterFrameChildComponentInjectionToken } from "@kubesightapp/react-application";
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { Notifications } from "./notifications";

export const notificationsClusterFrameChildComponentInjectable = getInjectable({
  id: "notifications-cluster-frame-child-component",

  instantiate: () => ({
    id: "notifications",
    shouldRender: computed(() => true),
    Component: Notifications,
  }),

  injectionToken: clusterFrameChildComponentInjectionToken,
});
