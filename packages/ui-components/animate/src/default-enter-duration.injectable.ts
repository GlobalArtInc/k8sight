import { getInjectable } from "@ogre-tools/injectable";

export const defaultEnterDurationForAnimatedInjectable = getInjectable({
  id: "default-enter-duration-for-animated",
  instantiate: () => 100,
});
