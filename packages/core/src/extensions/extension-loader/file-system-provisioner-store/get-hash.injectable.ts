import { getInjectable } from "@ogre-tools/injectable";
import { SHA256 } from "crypto-js";

const getHashInjectable = getInjectable({
  id: "get-hash",

  instantiate: () => (text: string) => SHA256(text).toString(),
});

export default getHashInjectable;
