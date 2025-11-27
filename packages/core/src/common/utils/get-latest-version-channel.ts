import { getRequestChannel } from "@kubesightapp/messaging";

export const getLatestVersionChannel = getRequestChannel<void, string | undefined>("get-latest-version-channel");
