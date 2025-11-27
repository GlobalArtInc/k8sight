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

const NonInjectedRadosBlockDevice = (props: PodVolumeVariantSpecificProps<"rbd"> & Dependencies) => {
  const {
    pod,
    variant: {
      monitors,
      image,
      fsType = "ext4",
      pool = "rbd",
      user = "admin",
      keyring = "/etc/ceph/keyright",
      secretRef,
      readOnly = false,
    },
    secretApi,
  } = props;

  return (
    <>
      <DrawerItem name="Ceph Monitors">
        <ul>
          {monitors.map((monitor) => (
            <li key={monitor}>{monitor}</li>
          ))}
        </ul>
      </DrawerItem>
      <DrawerItem name="Image">{image}</DrawerItem>
      <DrawerItem name="Filesystem Type">{fsType}</DrawerItem>
      <DrawerItem name="Pool">{pool}</DrawerItem>
      <DrawerItem name="User">{user}</DrawerItem>
      {secretRef ? (
        <LocalRef pod={pod} title="Authentication Secret" kubeRef={secretRef} api={secretApi} />
      ) : (
        <DrawerItem name="Keyright Path">{keyring}</DrawerItem>
      )}
      <DrawerItem name="Readonly">{readOnly.toString()}</DrawerItem>
    </>
  );
};

export const RadosBlockDevice = withInjectables<Dependencies, PodVolumeVariantSpecificProps<"rbd">>(
  NonInjectedRadosBlockDevice,
  {
    getProps: (di, props) => ({
      ...props,
      secretApi: di.inject(secretApiInjectable),
    }),
  },
);
