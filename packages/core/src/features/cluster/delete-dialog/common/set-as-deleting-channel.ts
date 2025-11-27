import { getRequestChannel } from "@kubesightapp/messaging";

import type { ClusterId } from "../../../../common/cluster-types";

export const setClusterAsDeletingChannel = getRequestChannel<ClusterId, void>("set-cluster-as-deleting");
