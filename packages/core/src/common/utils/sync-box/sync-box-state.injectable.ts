import { getInjectable, lifecycleEnum } from "@ogre-tools/injectable";
import { observable } from "mobx";

const syncBoxStateInjectable = getInjectable({
  id: "sync-box-state",

  instantiate: () => observable.box(),

  lifecycle: lifecycleEnum.keyedSingleton({
    getInstanceKey: (di, id: string) => id,
  }),
});

export default syncBoxStateInjectable;
