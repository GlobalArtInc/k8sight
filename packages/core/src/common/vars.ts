// App's common configuration for any process (main, renderer, build pipeline, etc.)
import type { ThemeId } from "../renderer/themes/lens-theme";

export const defaultThemeId: ThemeId = "lens-dark";
export const defaultFontSize = 12;
export const defaultTerminalFontFamily = "RobotoMono";
export const defaultEditorFontFamily = "RobotoMono";

// Apis
export const apiPrefix = "/api"; // local router apis
export const apiKubePrefix = "/api-kube"; // k8s cluster apis

// Links
export const issuesTrackerUrl = "https://github.com/GlobalArtInc/k8sight/issues" as string;
export const supportUrl = "https://github.com/GlobalArtInc/k8sight" as string;
export const docsUrl = "https://github.com/GlobalArtInc/k8sight/wiki" as string;
export const forumsUrl = "https://github.com/GlobalArtInc/k8sight/discussions" as string;
