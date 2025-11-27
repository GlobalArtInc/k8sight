import { getInjectable } from "@ogre-tools/injectable";

export const defaultLeaveDurationForAnimatedInjectable = getInjectable({
  id: "default-leave-duration-for-animated",
  instantiate: () => 100,
});
