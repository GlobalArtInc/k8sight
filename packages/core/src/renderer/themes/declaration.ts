import { getInjectionToken } from "@ogre-tools/injectable";

import type { ReadonlyDeep } from "type-fest";

import type { Theme } from "./k8sight-theme";

export const themeDeclarationInjectionToken = getInjectionToken<ReadonlyDeep<Theme>>({
  id: "theme-declaration",
});
