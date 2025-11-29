import { getInjectable } from "@ogre-tools/injectable";
import assert from "assert";
import { computed } from "mobx";
import colorThemePreferenceInjectable from "../../features/user-preferences/common/k8sight-color-theme.injectable";
import { themeDeclarationInjectionToken } from "./declaration";
import defaultThemeInjectable from "./default-theme.injectable";
import systemThemeConfigurationInjectable from "./system-theme.injectable";
import themesInjectable from "./themes.injectable";

const activeThemeInjectable = getInjectable({
  id: "active-theme",
  instantiate: (di) => {
    const themes = di.inject(themesInjectable);
    const themeDecls = di.injectMany(themeDeclarationInjectionToken);
    const colorThemePreference = di.inject(colorThemePreferenceInjectable);
    const systemThemeConfiguration = di.inject(systemThemeConfigurationInjectable);
    const defaultTheme = di.inject(defaultThemeInjectable);

    return computed(() => {
      const pref = colorThemePreference.get();

      if (pref.useSystemTheme) {
        const systemThemeType = systemThemeConfiguration.get();
        const matchingTheme = themeDecls.find((theme) => theme.type === systemThemeType);

        assert(matchingTheme, `Missing theme declaration for system theme "${systemThemeType}"`);

        return matchingTheme;
      }

      return themes.get(pref.themeId) ?? defaultTheme;
    });
  },
});

export default activeThemeInjectable;
