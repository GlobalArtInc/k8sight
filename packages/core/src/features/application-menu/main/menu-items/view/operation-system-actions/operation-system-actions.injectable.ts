import { getInjectable } from "@ogre-tools/injectable";
import isDevelopmentInjectable from "../../../../../../common/vars/is-development.injectable";
import applicationMenuItemInjectionToken from "../../application-menu-item-injection-token";
import { getApplicationMenuOperationSystemActionInjectable } from "../../get-application-menu-operation-system-action-injectable";

import type { OsActionMenuItem } from "../../application-menu-item-injection-token";

export const actionForToggleDevTools = getInjectable({
  id: "application-menu-operation-system-action/toggle-dev-tools",

  instantiate: (di): OsActionMenuItem => {
    const isDevelopment = di.inject(isDevelopmentInjectable);

    return {
      id: "toggle-dev-tools",
      parentId: "view",
      orderNumber: 70,
      kind: "os-action-menu-item" as const,
      actionName: "toggleDevTools" as const,
      isShown: isDevelopment,
    };
  },

  injectionToken: applicationMenuItemInjectionToken,
});

export const actionForResetZoom = getApplicationMenuOperationSystemActionInjectable({
  id: "reset-zoom",
  parentId: "view",
  orderNumber: 90,
  actionName: "resetZoom",
});

export const actionForZoomIn = getApplicationMenuOperationSystemActionInjectable({
  id: "zoom-in",
  parentId: "view",
  orderNumber: 100,
  actionName: "zoomIn",
});

export const actionForZoomOut = getApplicationMenuOperationSystemActionInjectable({
  id: "zoom-out",
  parentId: "view",
  orderNumber: 110,
  actionName: "zoomOut",
});

export const actionForToggleFullScreen = getApplicationMenuOperationSystemActionInjectable({
  id: "toggle-full-screen",
  parentId: "view",
  orderNumber: 130,
  actionName: "togglefullscreen",
});
