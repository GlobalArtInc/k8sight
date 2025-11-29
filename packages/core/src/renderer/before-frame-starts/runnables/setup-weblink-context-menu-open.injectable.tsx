import { getInjectable } from "@ogre-tools/injectable";
import React from "react";
import catalogCategoryRegistryInjectable from "../../../common/catalog/category-registry.injectable";
import { WeblinkAddCommand } from "../../components/catalog-entities/weblink-add-command";
import commandOverlayInjectable from "../../components/command-palette/command-overlay.injectable";
import { beforeFrameStartsSecondInjectionToken } from "../tokens";

const setupWeblinkContextMenuOpenInjectable = getInjectable({
  id: "setup-weblink-context-menu-open",
  instantiate: (di) => ({
    run: () => {
      const catalogCategoryRegistry = di.inject(catalogCategoryRegistryInjectable);
      const commandOverlay = di.inject(commandOverlayInjectable);

      catalogCategoryRegistry.getForGroupKind("entity.k8sk8sight.dev", "WebLink")?.on("catalogAddMenu", (ctx) => {
        ctx.menuItems.push({
          title: "Add web link",
          icon: "public",
          onClick: () => commandOverlay.open(<WeblinkAddCommand />),
        });
      });
    },
  }),
  injectionToken: beforeFrameStartsSecondInjectionToken,
});

export default setupWeblinkContextMenuOpenInjectable;
