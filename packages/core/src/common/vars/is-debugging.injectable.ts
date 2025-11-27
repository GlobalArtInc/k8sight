import { getInjectable } from "@ogre-tools/injectable";

const isDebuggingInjectable = getInjectable({
  id: "is-debugging",
  instantiate: () => ["true", "1", "yes", "y", "on"].includes((process.env.DEBUG ?? "").toLowerCase()),
  causesSideEffects: true,
});

export default isDebuggingInjectable;
