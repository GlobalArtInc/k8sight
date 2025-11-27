import React from "react";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const GlusterFs: VolumeVariantComponent<"glusterfs"> = ({ variant: { endpoints, path, readOnly = false } }) => (
  <>
    <DrawerItem name="Endpoints object name">{endpoints}</DrawerItem>
    <DrawerItem name="Glusterfs volume name">{path}</DrawerItem>
    <DrawerItem name="Readonly Mountpoint">{readOnly.toString()}</DrawerItem>
  </>
);
