import { getInjectable } from "@ogre-tools/injectable";

export type ShellSessionEnvs = Map<string, Record<string, string | undefined>>;

const shellSessionEnvsInjectable = getInjectable({
  id: "shell-session-envs",
  instantiate: (): ShellSessionEnvs => new Map(),
});

export default shellSessionEnvsInjectable;
