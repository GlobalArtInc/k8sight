import { getGlobalOverride } from "@kubesightapp/test-utils";
import spawnPtyInjectable from "./spawn-pty.injectable";

export default getGlobalOverride(spawnPtyInjectable, () => () => {
  throw new Error("Tried to spawn a PTY without an override");
});
