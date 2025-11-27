import { getInjectable } from "@ogre-tools/injectable";

const storageSaveDelayInjectable = getInjectable({
  id: "storage-save-delay",
  instantiate: () => 250,
});

export default storageSaveDelayInjectable;
