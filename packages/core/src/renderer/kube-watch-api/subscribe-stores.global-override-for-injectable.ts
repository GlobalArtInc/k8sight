import { getGlobalOverride } from "@kubesightapp/test-utils";
import subscribeStoresInjectable from "./subscribe-stores.injectable";

export default getGlobalOverride(subscribeStoresInjectable, () => () => () => {});
