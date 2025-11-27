import { getInjectable } from "@ogre-tools/injectable";
import { terminalFontInjectionToken } from "./token";
import UbuntuMono from "./UbuntuMonoNerdFont-Regular.ttf";

const ubuntuMonoTerminalFontInjectable = getInjectable({
  id: "ubuntu-mono-terminal-font",
  instantiate: () => ({
    name: "UbuntuMono",
    alias: "Ubuntu Mono",
    url: UbuntuMono,
  }),
  injectionToken: terminalFontInjectionToken,
});

export default ubuntuMonoTerminalFontInjectable;
