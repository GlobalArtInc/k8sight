// Monaco editor themes customization
import { getInjectionToken } from "@ogre-tools/injectable";

import type { editor } from "monaco-editor";

export type MonacoTheme = "vs" | "vs-dark" | "hc-black" | MonacoCustomTheme;
export type MonacoCustomTheme = "clouds-midnight";

export interface MonacoThemeData extends editor.IStandaloneThemeData {
  name: string;
}

export const customMonacoThemeInjectionToken = getInjectionToken<MonacoThemeData>({
  id: "custom-monaco-theme-token",
});
