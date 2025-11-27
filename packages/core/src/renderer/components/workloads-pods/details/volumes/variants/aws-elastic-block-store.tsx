import React from "react";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const AwsElasticBlockStore: VolumeVariantComponent<"awsElasticBlockStore"> = ({
  variant: { volumeID, fsType = "ext4" },
}) => (
  <>
    <DrawerItem name="Volume ID">{volumeID}</DrawerItem>
    <DrawerItem name="Filesystem Type">{fsType}</DrawerItem>
  </>
);
