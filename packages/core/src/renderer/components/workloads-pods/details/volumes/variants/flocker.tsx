import React from "react";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const Flocker: VolumeVariantComponent<"flocker"> = ({ variant: { datasetName } }) => (
  <>
    <DrawerItem name="Dataset Name">{datasetName}</DrawerItem>
  </>
);
