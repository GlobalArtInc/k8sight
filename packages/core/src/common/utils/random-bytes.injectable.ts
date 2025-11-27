import { getInjectable } from "@ogre-tools/injectable";
import { randomBytes } from "crypto";

export type RandomBytes = (size: number) => Buffer;

const randomBytesInjectable = getInjectable({
  id: "random-bytes",
  instantiate: (): RandomBytes => randomBytes,
  causesSideEffects: true,
});

export default randomBytesInjectable;
