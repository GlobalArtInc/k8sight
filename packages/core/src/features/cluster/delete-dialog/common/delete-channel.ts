import { getRequestChannel } from "@kubesightapp/messaging";

import type { RequestChannel } from "@kubesightapp/messaging";

import type { ClusterId } from "../../../../common/cluster-types";

export type DeleteClusterChannel = RequestChannel<ClusterId, void>;

export const deleteClusterChannel = getRequestChannel<ClusterId, void>("delete-cluster");
