import { observer } from "mobx-react";
import React from "react";
import { DrawerTitle } from "../../../drawer";
import { PodDetailsContainer } from "../../pod-details-container";

import type { Pod } from "@kubesightapp/kube-object";

interface PodDetailsContainersProps {
  pod: Pod;
}

const PodDetailsEphemeralContainers = observer(({ pod }: PodDetailsContainersProps) => {
  const ephemeralContainers = pod.getEphemeralContainersWithType();

  if (ephemeralContainers.length === 0) {
    return null;
  }

  return (
    <>
      <DrawerTitle>Ephemeral Containers</DrawerTitle>
      {ephemeralContainers.map((container) => (
        <PodDetailsContainer key={container.name} pod={pod} container={container} />
      ))}
    </>
  );
});

export { PodDetailsEphemeralContainers };
