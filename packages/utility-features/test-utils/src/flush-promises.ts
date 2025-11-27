import { setImmediate, setTimeout } from "timers/promises";

export const flushPromises = async () => {
  await setImmediate();
  await setTimeout(5);
};
