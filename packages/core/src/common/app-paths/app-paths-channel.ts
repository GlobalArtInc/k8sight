import { getRequestChannel } from "@kubesightapp/messaging";

import type { AppPaths } from "./app-path-injection-token";

export const appPathsChannel = getRequestChannel<void, AppPaths>("app-paths");
