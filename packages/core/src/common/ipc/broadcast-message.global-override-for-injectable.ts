import { getGlobalOverrideForFunction } from "@kubesightapp/test-utils";
import broadcastMessageInjectable from "./broadcast-message.injectable";

export default getGlobalOverrideForFunction(broadcastMessageInjectable);
