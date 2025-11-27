import { getInjectable } from "@ogre-tools/injectable";
import path from "path";

export type GetBasenameOfPath = (path: string) => string;

const getBasenameOfPathInjectable = getInjectable({
  id: "get-basename-of-path",
  instantiate: (): GetBasenameOfPath => path.basename,
  causesSideEffects: true,
});

export default getBasenameOfPathInjectable;
