import { configMapApiInjectable } from "@kubesightapp/kube-api-specifics";
import { withInjectables } from "@ogre-tools/injectable-react";
import React from "react";
import { LocalRef } from "../variant-helpers";

import type { ConfigMapApi } from "@kubesightapp/kube-api";

import type { PodVolumeVariantSpecificProps } from "../variant-helpers";

interface Dependencies {
  configMapApi: ConfigMapApi;
}

const NonInjectedConfigMap = (props: PodVolumeVariantSpecificProps<"configMap"> & Dependencies) => {
  const {
    pod,
    variant: { name },
    configMapApi,
  } = props;

  return <LocalRef pod={pod} title="Name" kubeRef={{ name }} api={configMapApi} />;
};

export const ConfigMap = withInjectables<Dependencies, PodVolumeVariantSpecificProps<"configMap">>(
  NonInjectedConfigMap,
  {
    getProps: (di, props) => ({
      ...props,
      configMapApi: di.inject(configMapApiInjectable),
    }),
  },
);
