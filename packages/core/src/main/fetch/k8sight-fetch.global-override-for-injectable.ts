import { getGlobalOverrideForFunction } from "@kubesightapp/test-utils";
import k8sightFetchInjectable from "./k8sight-fetch.injectable";

export default getGlobalOverrideForFunction(k8sightFetchInjectable);
