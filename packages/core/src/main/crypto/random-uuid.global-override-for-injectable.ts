import { getGlobalOverride } from "@kubesightapp/test-utils";
import randomUUIDInjectable from "./random-uuid.injectable";

export default getGlobalOverride(randomUUIDInjectable, () => () => {
  throw new Error("Tried to get a randomUUID without override");
});
