import { getInjectionToken } from "@ogre-tools/injectable";

import type { ReadonlyDeep } from "type-fest";

import type { LensTheme } from "./lens-theme";

export const lensThemeDeclarationInjectionToken = getInjectionToken<ReadonlyDeep<LensTheme>>({
  id: "lens-theme-declaration",
});
