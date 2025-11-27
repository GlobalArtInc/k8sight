import { getGlobalOverride } from "@kubesightapp/test-utils";
import commandLineArgumentsInjectable from "./command-line-arguments.injectable";

export default getGlobalOverride(commandLineArgumentsInjectable, () => []);
