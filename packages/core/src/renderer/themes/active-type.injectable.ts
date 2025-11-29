import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import activeThemeInjectable from "./active.injectable";

import type { IComputedValue } from "mobx";

import type { ThemeType } from "./k8sight-theme";

export type ActiveThemeType = IComputedValue<ThemeType>;

const activeThemeTypeInjectable = getInjectable({
  id: "active-theme-type",

  instantiate: (di) => {
    const activeTheme = di.inject(activeThemeInjectable);

    return computed(() => activeTheme.get().type);
  },
});

export default activeThemeTypeInjectable;
