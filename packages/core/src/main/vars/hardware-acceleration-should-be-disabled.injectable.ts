import { getInjectable } from "@ogre-tools/injectable";

const hardwareAccelerationShouldBeDisabledInjectable = getInjectable({
  id: "hardware-acceleration-should-be-disabled",
  instantiate: () => Boolean(process.env.LENS_DISABLE_GPU),
  causesSideEffects: true,
});

export default hardwareAccelerationShouldBeDisabledInjectable;
