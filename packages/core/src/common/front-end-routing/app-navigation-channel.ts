import { IpcRendererNavigationEvents } from "../ipc/navigation-events";

import type { MessageChannel } from "@kubesightapp/messaging";

export type AppNavigationChannel = MessageChannel<string>;

export const appNavigationChannel: AppNavigationChannel = {
  id: IpcRendererNavigationEvents.NAVIGATE_IN_APP,
};
