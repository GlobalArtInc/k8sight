import { getInjectable } from "@ogre-tools/injectable";
import commandLineArgumentsInjectable from "../../main/utils/command-line-arguments.injectable";

const isIntegrationTestingInjectable = getInjectable({
  id: "is-integration-testing",

  instantiate: (di) => {
    const commandLineArguments = di.inject(commandLineArgumentsInjectable);

    return commandLineArguments.includes("--integration-testing");
  },
});

export default isIntegrationTestingInjectable;
