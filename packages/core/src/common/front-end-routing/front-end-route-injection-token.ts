import { getInjectionToken } from "@ogre-tools/injectable";

import type { IComputedValue } from "mobx";

import type { K8sightRendererExtension } from "../../extensions/k8sight-renderer-extension";

export const frontEndRouteInjectionToken = getInjectionToken<Route<unknown>>({
  id: "front-end-route-injection-token",
});

export interface Route<TParameter = void> {
  path: string;
  clusterFrame: boolean;
  isEnabled: IComputedValue<boolean>;
  extension?: K8sightRendererExtension;

  readonly parameterSignature?: TParameter;
}
