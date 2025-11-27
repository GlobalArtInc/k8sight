import React from "react";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const EmptyDir: VolumeVariantComponent<"emptyDir"> = ({ variant: { medium, sizeLimit } }) => (
  <>
    <DrawerItem name="Medium">{medium || "<node's default medium>"}</DrawerItem>
    <DrawerItem name="Size Limit" hidden={!sizeLimit}>
      {sizeLimit}
    </DrawerItem>
  </>
);
