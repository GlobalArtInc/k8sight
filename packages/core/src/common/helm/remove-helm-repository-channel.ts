import { getRequestChannel } from "@kubesightapp/messaging";

import type { AsyncResult } from "@kubesightapp/utilities";

import type { HelmRepo } from "./helm-repo";

export const removeHelmRepositoryChannel = getRequestChannel<HelmRepo, AsyncResult<void, string>>(
  "remove-helm-repository-channel",
);
