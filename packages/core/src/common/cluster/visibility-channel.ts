import type { MessageChannel } from "@kubesightapp/messaging";

import type { ClusterId } from "../cluster-types";

export const clusterVisibilityChannel: MessageChannel<ClusterId | null> = {
  id: "cluster-visibility",
};
