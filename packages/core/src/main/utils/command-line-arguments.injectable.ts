import { getInjectable } from "@ogre-tools/injectable";

const commandLineArgumentsInjectable = getInjectable({
  id: "command-line-arguments",
  instantiate: () => process.argv,
  causesSideEffects: true,
});

export default commandLineArgumentsInjectable;
