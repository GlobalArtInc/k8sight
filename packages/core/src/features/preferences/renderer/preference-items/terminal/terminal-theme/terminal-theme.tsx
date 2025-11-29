import { withInjectables } from "@ogre-tools/injectable-react";
import { observer } from "mobx-react";
import React from "react";
import { SubTitle } from "../../../../../../renderer/components/layout/sub-title";
import { Select } from "../../../../../../renderer/components/select";
import { themeDeclarationInjectionToken } from "../../../../../../renderer/themes/declaration";
import userPreferencesStateInjectable from "../../../../../user-preferences/common/state.injectable";

import type { Theme } from "../../../../../../renderer/themes/k8sight-theme";
import type { UserPreferencesState } from "../../../../../user-preferences/common/state.injectable";

interface Dependencies {
  state: UserPreferencesState;
  themes: Theme[];
}

const NonInjectedTerminalTheme = observer(({ state, themes }: Dependencies) => {
  const themeOptions = [
    {
      value: "", // TODO: replace with a sentinel value that isn't string (and serialize it differently)
      label: "Match K8Sight Theme",
    },
    ...themes.map((theme) => ({
      value: theme.name,
      label: theme.name,
    })),
  ];

  return (
    <section id="terminalTheme">
      <SubTitle title="Terminal theme" />
      <Select
        id="terminal-theme-input"
        themeName="k8sight"
        options={themeOptions}
        value={state.terminalTheme}
        onChange={(option) => (state.terminalTheme = option?.value ?? "")}
      />
    </section>
  );
});

export const TerminalTheme = withInjectables<Dependencies>(NonInjectedTerminalTheme, {
  getProps: (di) => ({
    state: di.inject(userPreferencesStateInjectable),
    themes: di.injectMany(themeDeclarationInjectionToken),
  }),
});
