import { getInjectable } from "@ogre-tools/injectable";

import type { IPty } from "node-pty";

export type ShellSessionProcesses = Map<string, IPty>;

const shellSessionProcessesInjectable = getInjectable({
  id: "shell-session-processes",
  instantiate: (): ShellSessionProcesses => new Map(),
});

export default shellSessionProcessesInjectable;
