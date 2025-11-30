import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import React from "react";
import { SubTitle } from "../../../../../../renderer/components/layout/sub-title";
import { Select } from "../../../../../../renderer/components/select";
import { themeDeclarationInjectionToken } from "../../../../../../renderer/themes/declaration";
import defaultThemeInjectable from "../../../../../../renderer/themes/default-theme.injectable";
import userPreferencesStateInjectable from "../../../../../user-preferences/common/state.injectable";

import type { Theme as ThemeType } from "../../../../../../renderer/themes/theme";
import type { UserPreferencesState } from "../../../../../user-preferences/common/state.injectable";

interface Dependencies {
  state: UserPreferencesState;
  defaultTheme: ThemeType;
  themes: ThemeType[];
}

const NonInjectedTheme = observer(({ state, themes, defaultTheme }: Dependencies) => {
  const themeOptions = [
    {
      value: "system", // TODO: replace with a sentinel value that isn't string (and serialize it differently)
      label: "Sync with computer",
    },
    ...themes.map((theme) => ({
      value: theme.name,
      label: theme.name,
    })),
  ];

  return (
    <section id="appearance">
      <SubTitle title="Theme" />
      <Select
        id="theme-input"
        options={themeOptions}
        value={state.colorTheme}
        onChange={(value) => (state.colorTheme = value?.value ?? defaultTheme.name)}
        themeName="k8sight"
      />
    </section>
  );
});

export const Theme = withInjectables<Dependencies>(NonInjectedTheme, {
  getProps: (di) => ({
    state: di.inject(userPreferencesStateInjectable),
    defaultTheme: di.inject(defaultThemeInjectable),
    themes: di.injectMany(themeDeclarationInjectionToken),
  }),
});
