import { getRequestChannel } from "@kubesightapp/messaging";

import type { Result } from "@kubesightapp/utilities";

import type { DownloadBinaryOptions } from "../../main/fetch/download-binary.injectable";

export const downloadBinaryChannel = getRequestChannel<
  { url: string; opts: DownloadBinaryOptions },
  Result<Buffer, string>
>("download-binary-channel");
