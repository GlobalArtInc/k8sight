import { getInjectable } from "@ogre-tools/injectable";
import { randomUUID } from "crypto";

const randomUUIDInjectable = getInjectable({
  id: "random-uuid",
  instantiate: () => randomUUID,
  causesSideEffects: true,
});

export default randomUUIDInjectable;
