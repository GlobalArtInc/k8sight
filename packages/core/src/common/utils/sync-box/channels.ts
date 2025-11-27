import { getMessageChannel, getRequestChannel } from "@kubesightapp/messaging";

export const syncBoxChannel = getMessageChannel<{ id: string; value: any }>("sync-box-channel");

export const syncBoxInitialValueChannel = getRequestChannel<void, { id: string; value: any }[]>(
  "sync-box-initial-value-channel",
);
