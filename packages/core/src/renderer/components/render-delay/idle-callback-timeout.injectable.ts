import { getInjectable } from "@ogre-tools/injectable";

const idleCallbackTimeoutInjectable = getInjectable({
  id: "idle-callback-timeout",
  instantiate: () => 1000,
});

export default idleCallbackTimeoutInjectable;
