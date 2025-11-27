import type { MessageChannel } from "@kubesightapp/messaging";

import type { ClusterId } from "../cluster-types";

export const currentClusterMessageChannel: MessageChannel<ClusterId> = {
  id: "current-visible-cluster",
};
