import type { MessageChannel } from "@kubesightapp/messaging";

export type RootFrameHasRenderedChannel = MessageChannel<void>;

export const rootFrameHasRenderedChannel: RootFrameHasRenderedChannel = {
  id: "root-frame-rendered",
};
