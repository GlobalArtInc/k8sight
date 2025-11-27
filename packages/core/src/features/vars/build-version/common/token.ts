import { getInitializable } from "../../../../common/initializable-state/create";

import type { RequestChannel } from "@kubesightapp/messaging";

export const buildVersionInitializable = getInitializable<string>("build-version");

export const buildVersionChannel: RequestChannel<void, string> = {
  id: "build-version",
};
