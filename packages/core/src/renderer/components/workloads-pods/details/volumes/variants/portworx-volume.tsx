import React from "react";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const PortworxVolume: VolumeVariantComponent<"portworxVolume"> = ({
  variant: { volumeID, fsType = "ext4", readOnly = false },
}) => (
  <>
    <DrawerItem name="Volume ID">{volumeID}</DrawerItem>
    <DrawerItem name="Filesystem Type">{fsType}</DrawerItem>
    <DrawerItem name="Readonly">{readOnly.toString()}</DrawerItem>
  </>
);
