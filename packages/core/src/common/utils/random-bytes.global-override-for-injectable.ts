import { getGlobalOverride } from "@kubesightapp/test-utils";
import randomBytesInjectable from "./random-bytes.injectable";

export default getGlobalOverride(randomBytesInjectable, () => (size) => {
  const res = Buffer.alloc(size);

  for (let i = 0; i < size; i += 1) {
    res[i] = i;
  }

  return res;
});
