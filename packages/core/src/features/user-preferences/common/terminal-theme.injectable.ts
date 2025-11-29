import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import userPreferencesStateInjectable from "./state.injectable";

export type TerminalThemePreference =
  | {
      matchTheme: true;
    }
  | {
      matchTheme: false;
      themeId: string;
    };

const terminalThemePreferenceInjectable = getInjectable({
  id: "terminal-theme-preference",
  instantiate: (di) => {
    const state = di.inject(userPreferencesStateInjectable);

    return computed((): TerminalThemePreference => {
      // NOTE: remove use of magic strings
      if (!state.terminalTheme) {
        return {
          matchTheme: true,
        };
      }

      return {
        matchTheme: false,
        themeId: state.terminalTheme,
      };
    });
  },
});

export default terminalThemePreferenceInjectable;
