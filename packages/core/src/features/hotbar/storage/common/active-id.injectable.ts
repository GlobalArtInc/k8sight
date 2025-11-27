import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

const activeHotbarIdInjectable = getInjectable({
  id: "active-hotbar-id",
  instantiate: () => observable.box<string>(),
});

export default activeHotbarIdInjectable;
