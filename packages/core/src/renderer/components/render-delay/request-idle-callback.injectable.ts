import { getInjectable } from "@ogre-tools/injectable";

export type RequestIdleCallback = (callback: () => void, options: { timeout: number }) => number;

const requestIdleCallbackInjectable = getInjectable({
  id: "request-idle-callback",
  instantiate: (): RequestIdleCallback => window.requestIdleCallback,
  causesSideEffects: true,
});

export default requestIdleCallbackInjectable;
