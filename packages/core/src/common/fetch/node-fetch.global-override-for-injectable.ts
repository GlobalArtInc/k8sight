import { getGlobalOverrideForFunction } from "@kubesightapp/test-utils";
import nodeFetchInjectable from "./node-fetch.injectable";

export default getGlobalOverrideForFunction(nodeFetchInjectable);
