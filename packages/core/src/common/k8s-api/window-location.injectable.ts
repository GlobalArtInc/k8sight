import { getInjectable } from "@ogre-tools/injectable";

const windowLocationInjectable = getInjectable({
  id: "window-location",
  instantiate: () => {
    const { host, port } = window.location;

    return { host, port };
  },
  causesSideEffects: true,
});

export default windowLocationInjectable;
