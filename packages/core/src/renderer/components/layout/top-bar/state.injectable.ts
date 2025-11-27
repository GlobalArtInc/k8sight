import { getInjectable } from "@ogre-tools/injectable";
import { observable } from "mobx";

const topBarStateInjectable = getInjectable({
  id: "top-bar-state",
  instantiate: () =>
    observable.object({
      prevEnabled: false,
      nextEnabled: false,
    }),
});

export default topBarStateInjectable;
