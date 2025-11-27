import type { MessageChannel } from "@kubesightapp/messaging";

export type ReloadPageChannel = MessageChannel<void>;

export const reloadPageChannel: ReloadPageChannel = {
  id: "reload-page-channel",
};
