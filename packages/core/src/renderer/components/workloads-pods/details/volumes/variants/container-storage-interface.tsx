import { secretApiInjectable } from "@kubesightapp/kube-api-specifics";
import { withInjectables } from "@ogre-tools/injectable-react";
import React from "react";
import { DrawerItem } from "../../../../drawer";
import { LocalRef } from "../variant-helpers";

import type { SecretApi } from "@kubesightapp/kube-api";

import type { PodVolumeVariantSpecificProps } from "../variant-helpers";

interface Dependencies {
  secretApi: SecretApi;
}

const NonInjectedContainerStorageInterface = (props: PodVolumeVariantSpecificProps<"csi"> & Dependencies) => {
  const {
    pod,
    variant: {
      driver,
      readOnly = false,
      fsType = "ext4",
      volumeAttributes = {},
      nodePublishSecretRef,
      controllerPublishSecretRef,
      nodeStageSecretRef,
      controllerExpandSecretRef,
    },
    secretApi,
  } = props;

  return (
    <>
      <DrawerItem name="Driver">{driver}</DrawerItem>
      <DrawerItem name="ReadOnly">{readOnly.toString()}</DrawerItem>
      <DrawerItem name="Filesystem Type">{fsType}</DrawerItem>
      <LocalRef pod={pod} title="Controller Publish Secret" kubeRef={controllerPublishSecretRef} api={secretApi} />
      <LocalRef pod={pod} title="Controller Expand Secret" kubeRef={controllerExpandSecretRef} api={secretApi} />
      <LocalRef pod={pod} title="Node Publish Secret" kubeRef={nodePublishSecretRef} api={secretApi} />
      <LocalRef pod={pod} title="Node Stage Secret" kubeRef={nodeStageSecretRef} api={secretApi} />
      {Object.entries(volumeAttributes).map(([key, value]) => (
        <DrawerItem key={key} name={key}>
          {value}
        </DrawerItem>
      ))}
    </>
  );
};

export const ContainerStorageInterface = withInjectables<Dependencies, PodVolumeVariantSpecificProps<"csi">>(
  NonInjectedContainerStorageInterface,
  {
    getProps: (di, props) => ({
      ...props,
      secretApi: di.inject(secretApiInjectable),
    }),
  },
);
