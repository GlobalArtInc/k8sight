import { asLegacyGlobalForExtensionApi } from "@kubesightapp/legacy-global-di";
import activeThemeInjectable from "../../renderer/themes/active.injectable";

import type { Theme } from "../../renderer/themes/theme";

export const activeTheme = asLegacyGlobalForExtensionApi(activeThemeInjectable);

/**
 * @deprecated This hides the reactivity of active theme, use {@link activeTheme} instead
 */
export function getActiveTheme() {
  return activeTheme.get();
}

export type { Theme };
