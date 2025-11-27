import { getInjectable } from "@ogre-tools/injectable";
import fsInjectable from "./fs.injectable";

import type { JsonValue } from "type-fest";

export type ReadJson = (filePath: string) => Promise<JsonValue>;

const readJsonFileInjectable = getInjectable({
  id: "read-json-file",
  instantiate: (di): ReadJson => di.inject(fsInjectable).readJson,
});

export default readJsonFileInjectable;
