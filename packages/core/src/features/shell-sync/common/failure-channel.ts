import type { MessageChannel } from "@kubesightapp/messaging";

export const shellSyncFailedChannel: MessageChannel<string> = {
  id: "shell-sync-failed-channel",
};
