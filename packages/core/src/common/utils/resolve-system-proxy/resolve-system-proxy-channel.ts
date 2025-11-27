import { getRequestChannel } from "@kubesightapp/messaging";

export const resolveSystemProxyChannel = getRequestChannel<string, string>("resolve-system-proxy-channel");
