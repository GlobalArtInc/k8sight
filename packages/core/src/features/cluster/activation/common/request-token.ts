import { getInjectionToken } from "@ogre-tools/injectable";

import type { ChannelRequester } from "@kubesightapp/messaging";

import type { activateClusterChannel, deactivateClusterChannel } from "./channels";

export type RequestClusterActivation = ChannelRequester<typeof activateClusterChannel>;

export const requestClusterActivationInjectionToken = getInjectionToken<RequestClusterActivation>({
  id: "request-cluster-activation-token",
});

export type RequestClusterDeactivation = ChannelRequester<typeof deactivateClusterChannel>;

export const requestClusterDeactivationInjectionToken = getInjectionToken<RequestClusterDeactivation>({
  id: "request-cluster-deactivation-token",
});
