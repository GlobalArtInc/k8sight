import { observer } from "mobx-react";
import React from "react";
import { DrawerTitle } from "../../../drawer";
import { PodDetailsContainer } from "../../pod-details-container";

import type { Pod } from "@kubesightapp/kube-object";

interface PodDetailsContainersProps {
  pod: Pod;
}

const PodDetailsInitContainers = observer(({ pod }: PodDetailsContainersProps) => {
  const initContainers = pod.getInitContainersWithType();

  if (initContainers.length === 0) {
    return null;
  }

  return (
    <>
      <DrawerTitle>Init Containers</DrawerTitle>
      {initContainers.map((container) => (
        <PodDetailsContainer key={container.name} pod={pod} container={container} />
      ))}
    </>
  );
});

export { PodDetailsInitContainers };
