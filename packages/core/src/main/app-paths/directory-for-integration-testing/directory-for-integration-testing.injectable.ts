import { getInjectable } from "@ogre-tools/injectable";

const directoryForIntegrationTestingInjectable = getInjectable({
  id: "directory-for-integration-testing",
  instantiate: () => process.env.K8SIGHT_INTEGRATION_TESTING_DIR,
  causesSideEffects: true,
});

export default directoryForIntegrationTestingInjectable;
