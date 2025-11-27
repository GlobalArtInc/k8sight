import { getRequestChannel } from "@kubesightapp/messaging";

import type { Result } from "@kubesightapp/utilities";

import type { HelmRepo } from "./helm-repo";

export const addHelmRepositoryChannel = getRequestChannel<HelmRepo, Result<void, string>>(
  "add-helm-repository-channel",
);
