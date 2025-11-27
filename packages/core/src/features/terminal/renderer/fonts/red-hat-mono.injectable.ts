import { getInjectable } from "@ogre-tools/injectable";
import RedHatMono from "./RedHatMono-Regular.ttf";
import { terminalFontInjectionToken } from "./token";

const redHatMonoTerminalFontInjectable = getInjectable({
  id: "red-hat-mono-terminal-font",
  instantiate: () => ({
    name: "Red Hat Mono",
    url: RedHatMono,
  }),
  injectionToken: terminalFontInjectionToken,
});

export default redHatMonoTerminalFontInjectable;
