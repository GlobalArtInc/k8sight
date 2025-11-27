import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

const badgeHasTextSelectedStateInjectable = getInjectable({
  id: "badge-has-text-selected-state",
  instantiate: () => observable.box(false),
});

export default badgeHasTextSelectedStateInjectable;
