import { getInjectable } from "@ogre-tools/injectable";

const isSnapPackageInjectable = getInjectable({
  id: "is-snap",
  instantiate: () => Boolean(process.env.SNAP),
  causesSideEffects: true,
});

export default isSnapPackageInjectable;
