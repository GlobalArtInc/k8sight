import { IpcRendererNavigationEvents } from "../ipc/navigation-events";

import type { MessageChannel } from "@kubesightapp/messaging";

export type ClusterFrameNavigationChannel = MessageChannel<string>;

export const clusterFrameNavigationChannel: ClusterFrameNavigationChannel = {
  id: IpcRendererNavigationEvents.NAVIGATE_IN_CLUSTER,
};
