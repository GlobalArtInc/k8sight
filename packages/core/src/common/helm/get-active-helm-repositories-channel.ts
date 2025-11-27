import { getRequestChannel } from "@kubesightapp/messaging";

import type { AsyncResult } from "@kubesightapp/utilities";

import type { HelmRepo } from "./helm-repo";

export const getActiveHelmRepositoriesChannel = getRequestChannel<void, AsyncResult<HelmRepo[]>>(
  "get-helm-active-list-repositories",
);
