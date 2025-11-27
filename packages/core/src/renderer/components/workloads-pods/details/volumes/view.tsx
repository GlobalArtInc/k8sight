import { Icon } from "@kubesightapp/icon";
import { observer } from "mobx-react";
import React from "react";
import { DrawerTitle } from "../../../drawer";
import { VolumeVariant } from "./variant";

import type { Pod } from "@kubesightapp/kube-object";

export interface PodVolumesProps {
  pod: Pod;
}

export const PodVolumes = observer(({ pod }: PodVolumesProps) => {
  const volumes = pod.getVolumes() ?? [];

  if (volumes.length === 0) {
    return null;
  }

  return (
    <>
      <DrawerTitle>Volumes</DrawerTitle>
      {volumes.map((volume) => (
        <div key={volume.name} className="volume">
          <div className="title flex gaps">
            <Icon small material="storage" />
            <span>{volume.name}</span>
          </div>
          <VolumeVariant pod={pod} volume={volume} />
        </div>
      ))}
    </>
  );
});
