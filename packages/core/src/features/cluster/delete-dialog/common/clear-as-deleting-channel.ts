import { getRequestChannel } from "@kubesightapp/messaging";

import type { ClusterId } from "../../../../common/cluster-types";

export const clearClusterAsDeletingChannel = getRequestChannel<ClusterId, void>("clear-cluster-as-deleting");
