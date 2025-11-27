import { getInjectable } from "@ogre-tools/injectable";

const currentlyInClusterFrameInjectable = getInjectable({
  id: "currently-in-cluster-frame",
  instantiate: () => !process.isMainFrame,
  causesSideEffects: true,
});

export default currentlyInClusterFrameInjectable;
