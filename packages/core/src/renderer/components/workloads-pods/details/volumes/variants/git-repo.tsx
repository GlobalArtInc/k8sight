import React from "react";
import { DrawerItem } from "../../../../drawer";

import type { VolumeVariantComponent } from "../variant-helpers";

export const GitRepo: VolumeVariantComponent<"gitRepo"> = ({ variant: { repository, revision } }) => (
  <>
    <DrawerItem name="Repository URL">{repository}</DrawerItem>
    <DrawerItem name="Commit Hash">{revision}</DrawerItem>
  </>
);
