import { getInjectable } from "@ogre-tools/injectable";
import SpaceMono from "./SpaceMonoNerdFont-Regular.ttf";
import { terminalFontInjectionToken } from "./token";

const spaceMonoTerminalFontInjectable = getInjectable({
  id: "space-mono-terminal-font",
  instantiate: () => ({
    name: "SpaceMono",
    alias: "Space Mono",
    url: SpaceMono,
  }),
  injectionToken: terminalFontInjectionToken,
});

export default spaceMonoTerminalFontInjectable;
