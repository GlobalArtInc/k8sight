import type { MessageChannel, RequestChannel } from "@kubesightapp/messaging";

export type SystemThemeType = "dark" | "light";

export const initialSystemThemeTypeChannel: RequestChannel<void, SystemThemeType> = {
  id: "initial-system-theme-type",
};

export const systemThemeTypeUpdateChannel: MessageChannel<SystemThemeType> = {
  id: "system-theme-type-update",
};
