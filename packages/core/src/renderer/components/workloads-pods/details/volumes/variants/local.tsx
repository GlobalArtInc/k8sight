import React from "react";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const Local: VolumeVariantComponent<"local"> = ({ variant: { path } }) => (
  <>
    <DrawerItem name="Path">{path}</DrawerItem>
  </>
);
