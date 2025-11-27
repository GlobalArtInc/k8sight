import type { MessageChannel } from "@kubesightapp/messaging";

export interface NavigateForExtensionArgs {
  extId: string;
  pageId: string | undefined;
  params: Record<string, any> | undefined;
}

export const navigateForExtensionChannel: MessageChannel<NavigateForExtensionArgs> = {
  id: "navigate-for-extension",
};
