import { getGlobalOverrideForFunction } from "@kubesightapp/test-utils";
import requestPublicHelmRepositoriesInjectable from "./request-public-helm-repositories.injectable";

export default getGlobalOverrideForFunction(requestPublicHelmRepositoriesInjectable);
