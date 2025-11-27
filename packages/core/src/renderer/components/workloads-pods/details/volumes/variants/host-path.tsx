import React from "react";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const HostPath: VolumeVariantComponent<"hostPath"> = ({ variant: { path, type } }) => (
  <>
    <DrawerItem name="Node's Host Filesystem Path">{path}</DrawerItem>
    <DrawerItem name="Check Behaviour">{type || "-- none --"}</DrawerItem>
  </>
);
