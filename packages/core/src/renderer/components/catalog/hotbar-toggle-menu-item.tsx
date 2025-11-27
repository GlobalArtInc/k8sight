import { withInjectables } from "@ogre-tools/injectable-react";
import React, { useState } from "react";
import activeHotbarInjectable from "../../../features/hotbar/storage/common/active.injectable";
import { MenuItem } from "../menu";

import type { StrictReactNode } from "@kubesightapp/utilities";

import type { IComputedValue } from "mobx";

import type { Hotbar } from "../../../features/hotbar/storage/common/hotbar";
import type { CatalogEntity } from "../../api/catalog-entity";

interface Dependencies {
  activeHotbar: IComputedValue<Hotbar | undefined>;
}

interface HotbarToggleMenuItemProps {
  entity: CatalogEntity;
  addContent: StrictReactNode;
  removeContent: StrictReactNode;
}

function NonInjectedHotbarToggleMenuItem({
  addContent,
  entity,
  activeHotbar,
  removeContent,
}: Dependencies & HotbarToggleMenuItemProps) {
  const [itemInHotbar, setItemInHotbar] = useState(activeHotbar.get()?.hasEntity(entity.getId()) ?? false);

  return (
    <MenuItem
      onClick={() => {
        if (itemInHotbar) {
          activeHotbar.get()?.removeEntity(entity.getId());
          setItemInHotbar(false);
        } else {
          activeHotbar.get()?.addEntity(entity);
          setItemInHotbar(true);
        }
      }}
    >
      {itemInHotbar ? removeContent : addContent}
    </MenuItem>
  );
}

export const HotbarToggleMenuItem = withInjectables<Dependencies, HotbarToggleMenuItemProps>(
  NonInjectedHotbarToggleMenuItem,
  {
    getProps: (di, props) => ({
      ...props,
      activeHotbar: di.inject(activeHotbarInjectable),
    }),
  },
);
