import { getInjectable } from "@ogre-tools/injectable";
import path from "path";

export type GetRelativePath = (from: string, to: string) => string;

const getRelativePathInjectable = getInjectable({
  id: "get-relative-path",
  instantiate: (): GetRelativePath => path.relative,
  causesSideEffects: true,
});

export default getRelativePathInjectable;
