import { getGlobalOverrideForFunction } from "@kubesightapp/test-utils";
import lensFetchInjectable from "./lens-fetch.injectable";

export default getGlobalOverrideForFunction(lensFetchInjectable);
