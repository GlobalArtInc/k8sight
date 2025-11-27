import { getInjectable } from "@ogre-tools/injectable";
import { terminalFontInjectionToken } from "./token";

const terminalFontsInjectable = getInjectable({
  id: "terminal-fonts",
  instantiate: (di) => di.injectMany(terminalFontInjectionToken),
});

export default terminalFontsInjectable;
