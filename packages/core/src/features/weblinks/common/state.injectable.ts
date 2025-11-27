import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

import type { WeblinkData } from "./storage.injectable";

const weblinksStateInjectable = getInjectable({
  id: "weblinks-state",
  instantiate: () => observable.map<string, WeblinkData>(),
});

export default weblinksStateInjectable;
