import { getInjectionToken } from "@ogre-tools/injectable";

export interface TerminalFont {
  name: string;
  alias?: string;
  url: string;
}

export const terminalFontInjectionToken = getInjectionToken<TerminalFont>({
  id: "terminal-font-token",
});
