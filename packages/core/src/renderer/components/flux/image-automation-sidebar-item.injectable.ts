import { sidebarItemInjectionToken } from "@kubesightapp/cluster-sidebar";
import { getInjectable } from "@ogre-tools/injectable";
import { noop } from "lodash/fp";
import fluxSidebarItemInjectable from "./flux-sidebar-item.injectable";

const fluxImageAutomationSidebarItemInjectable = getInjectable({
  id: "sidebar-item-flux-image-automation",

  instantiate: () => ({
    parentId: fluxSidebarItemInjectable.id,
    title: "Image Automation",
    onClick: noop,
    orderNumber: 40,
  }),

  injectionToken: sidebarItemInjectionToken,
});

export default fluxImageAutomationSidebarItemInjectable;
