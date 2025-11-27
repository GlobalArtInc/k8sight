import { observer } from "mobx-react";
import React from "react";
import { DrawerTitle } from "../../../drawer";
import { PodDetailsContainer } from "../../pod-details-container";

import type { Pod } from "@kubesightapp/kube-object";

interface PodDetailsContainersProps {
  pod: Pod;
}

const PodDetailsContainers = observer(({ pod }: PodDetailsContainersProps) => {
  const containers = pod.getContainersWithType();

  return (
    <>
      <DrawerTitle>Containers</DrawerTitle>
      {containers.map((container) => (
        <PodDetailsContainer key={container.name} pod={pod} container={container} />
      ))}
    </>
  );
});

export { PodDetailsContainers };
