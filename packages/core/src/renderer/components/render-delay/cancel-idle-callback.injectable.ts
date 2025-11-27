import { getInjectable } from "@ogre-tools/injectable";

export type CancelIdleCallback = (handle: number) => void;

const cancelIdleCallbackInjectable = getInjectable({
  id: "cancel-idle-callback",
  instantiate: (): CancelIdleCallback => window.cancelIdleCallback,
  causesSideEffects: true,
});

export default cancelIdleCallbackInjectable;
