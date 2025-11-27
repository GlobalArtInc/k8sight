import React from "react";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const PhotonPersistentDisk: VolumeVariantComponent<"photonPersistentDisk"> = ({
  variant: { pdID, fsType = "ext4" },
}) => (
  <>
    <DrawerItem name="Persistent Disk ID">{pdID}</DrawerItem>
    <DrawerItem name="Filesystem Type">{fsType}</DrawerItem>
  </>
);
