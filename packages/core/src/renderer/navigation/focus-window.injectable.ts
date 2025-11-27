import { getInjectable } from "@ogre-tools/injectable";

const focusWindowInjectable = getInjectable({
  id: "focus-window",
  instantiate: () => () => window.focus(),
  causesSideEffects: true,
});

export default focusWindowInjectable;
