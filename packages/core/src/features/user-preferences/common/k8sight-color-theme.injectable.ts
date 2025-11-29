import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import userPreferencesStateInjectable from "./state.injectable";

export type ColorThemePreference =
  | {
      useSystemTheme: true;
    }
  | {
      useSystemTheme: false;
      themeId: string;
    };

const colorThemePreferenceInjectable = getInjectable({
  id: "color-theme-preference",
  instantiate: (di) => {
    const state = di.inject(userPreferencesStateInjectable);

    return computed((): ColorThemePreference => {
      // TODO: remove magic strings
      if (state.colorTheme === "system") {
        return {
          useSystemTheme: true,
        };
      }

      return {
        useSystemTheme: false,
        themeId: state.colorTheme,
      };
    });
  },
});

export default colorThemePreferenceInjectable;
