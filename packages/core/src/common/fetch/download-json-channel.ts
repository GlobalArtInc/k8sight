import { getRequestChannel } from "@kubesightapp/messaging";

import type { Result } from "@kubesightapp/utilities";

import type { DownloadJsonOptions } from "../../main/fetch/download-json.injectable";

export const downloadJsonChannel = getRequestChannel<
  { url: string; opts: DownloadJsonOptions },
  Result<unknown, string>
>("download-json-channel");
