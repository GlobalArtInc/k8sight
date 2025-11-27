import { getInjectable } from "@ogre-tools/injectable";

const processArchInjectable = getInjectable({
  id: "process-arch",
  instantiate: () => process.arch as string,
  causesSideEffects: true,
});

export default processArchInjectable;
