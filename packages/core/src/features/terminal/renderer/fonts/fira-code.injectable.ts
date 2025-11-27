import { getInjectable } from "@ogre-tools/injectable";
import FiraCode from "./FiraCodeNerdFont-Regular.ttf";
import { terminalFontInjectionToken } from "./token";

const firaCodeTerminalFontInjectable = getInjectable({
  id: "fira-code-terminal-font",
  instantiate: () => ({
    name: "FiraCode",
    url: FiraCode,
  }),
  injectionToken: terminalFontInjectionToken,
});

export default firaCodeTerminalFontInjectable;
